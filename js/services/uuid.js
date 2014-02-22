angular.module('iPregnant.services.uuid', [], function ($provide) {

  $provide.factory('uuidGenerator', function () {

    function Generator() {
      this.parts = [];
      this.init();
    }

    Generator.prototype = {

      twoPow14: Math.pow(2, 14),
      twoPow16: Math.pow(2, 16),
      twoPow28: Math.pow(2, 28),
      twoPow32: Math.pow(2, 32),

      /**
       * The id for this generator instance. By default all model instances share the same
       * UUID generator instance. By specifying an id other then 'uuid', a unique generator instance
       * will be created for the Model.
       */
      id: undefined,

      /**
       * @property {Number/Object} salt
       * When created, this value is a 48-bit number. For computation, this value is split
       * into 32-bit parts and stored in an object with `hi` and `lo` properties.
       */
      salt: null,

      /**
       * @property {Number/Object} timestamp
       * When created, this value is a 60-bit number. For computation, this value is split
       * into 32-bit parts and stored in an object with `hi` and `lo` properties.
       */
      timestamp: null,

      /**
       * @cfg {Number} version
       * The Version of UUID. Supported values are:
       *
       *  * 1 : Time-based, "sequential" UUID.
       *  * 4 : Pseudo-random UUID.
       *
       * The default is 4.
       */
      version: 4,

      getSalt: function () {
        return this.salt;
      },

      getTimestamp: function () {
        return this.timestamp;
      },

      getVersion: function () {
        return this.version;
      },

      setSalt: function (salt) {
        this.salt = salt;
      },

      setTimestamp: function (timestamp) {
        this.timestamp = timestamp;
      },

      setVersion: function (version) {
        this.version = version;
      },

      init: function () {
        var me = this,
          salt = me.getSalt(),
          time = me.getTimestamp();

        if (me.getVersion() == 4) {
          // See RFC 4122 (Secion 4.4)
          //   o  If the state was unavailable (e.g., non-existent or corrupted),
          //      or the saved node ID is different than the current node ID,
          //      generate a random clock sequence value.
          me.clockSeq = me.rand(0, me.twoPow14 - 1);

          if (!salt) {
            salt = {};
            me.setSalt(salt);
          }

          if (!time) {
            time = {};
            me.setTimestamp(time);
          }

          // See RFC 4122 (Secion 4.4)
          salt.lo = me.rand(0, me.twoPow32 - 1);
          salt.hi = me.rand(0, me.twoPow16 - 1);
          time.lo = me.rand(0, me.twoPow32 - 1);
          time.hi = me.rand(0, me.twoPow28 - 1);
        } else {
          // this is run only once per-instance
          me.setSalt(me.split(me.getSalt()));
          me.setTimestamp(me.split(me.getTimestamp()));

          // Set multicast bit: "the least significant bit of the first octet of the
          // node ID" (nodeId = salt for this implementation):
          me.getSalt().hi |= 0x100;
        }
      },

      generate: function () {
        var me = this,
          parts = me.parts,
          version = me.getVersion(),
          salt = me.getSalt(),
          time = me.getTimestamp();

        /*
         The magic decoder ring (derived from RFC 4122 Section 4.2.2):

         +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
         |                          time_low                             |
         +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
         |           time_mid            |  ver  |        time_hi        |
         +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
         |res|  clock_hi |   clock_low   |    salt 0   |M|     salt 1    |
         +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
         |                         salt (2-5)                            |
         +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

         time_mid      clock_hi (low 6 bits)
         time_low     | time_hi |clock_lo
         |        |     |   || salt[0]
         |        |     |   ||   | salt[1..5]
         v        v     v   vv   v v
         0badf00d-aced-1def-b123-dfad0badbeef
         ^    ^     ^
         version    |     multicast (low bit)
         |
         reserved (upper 2 bits)
         */
        parts[0] = me.toHex(time.lo, 8);
        parts[1] = me.toHex(time.hi & 0xFFFF, 4);
        parts[2] = me.toHex(((time.hi >>> 16) & 0xFFF) | (version << 12), 4);
        parts[3] = me.toHex(0x80 | ((me.clockSeq >>> 8) & 0x3F), 2) +
          me.toHex(me.clockSeq & 0xFF, 2);
        parts[4] = me.toHex(salt.hi, 4) + me.toHex(salt.lo, 8);

        if (version == 4) {
          me.init(); // just regenerate all the random values...
        } else {
          // sequentially increment the timestamp...
          ++time.lo;
          if (time.lo >= me.twoPow32) { // if (overflow)
            time.lo = 0;
            ++time.hi;
          }
        }

        return parts.join('-').toLowerCase();
      },
      /**
       * Converts a value into a hexadecimal value. Also allows for a maximum length
       * of the returned value.
       * @param {String} value
       * @param {Number} length
       * @private
       */
      toHex: function (value, length) {
        var ret = value.toString(16);
        if (ret.length > length) {
          ret = ret.substring(ret.length - length); // right-most digits
        } else if (ret.length < length) {
          ret = this.leftPad(ret, length, '0');
        }
        return ret;
      },

      /**
       * Generates a random value with between a low and high.
       * @param {Number} low
       * @param {Number} high
       * @private
       */
      rand: function (low, high) {
        var v = Math.random() * (high - low + 1);
        return Math.floor(v) + low;
      },

      /**
       * Splits a number into a low and high value.
       * @param {Number} bignum
       * @private
       */
      split: function (bignum) {
        if (typeof(bignum) == 'number') {
          var hi = Math.floor(bignum / this.twoPow32);
          return {
            lo: Math.floor(bignum - hi * this.twoPow32),
            hi: hi
          };
        }
        return bignum;
      },

      leftPad: function (string, size, character) {
        var result = String(string);
        character = character || " ";
        while (result.length < size) {
          result = character + result;
        }
        return result;
      }

    };

    return new Generator();
  });
});