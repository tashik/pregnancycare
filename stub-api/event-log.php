<?php

$level = 0;
$currentWeek = 32;
mt_srand();

$procedures = array(
  'Процедура такая-то',
  'Другая процедура',
  'Комплексный массай для релаксации',
);

$defaults = array(
  1 => array(
    'report' => true,
    'analysis' => null,
  ),
  2 => array(
    'report' => true,
    'analysis' => null,
  ),
  3 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'ПЦР-исследование' => 2,
      'Онкоцитология' => 2,
      'Бакпосев' => 2,
      'Кольпоскопия' => 2,
      'Обследование на АФЛС' => 2,
      'Анализ крови на Т3, Т4, ТТГ, АТ-ТПО, ХГЧ, своб эстриол. ДГЭАС, тестостерон, 17-ОП' => 2,
      'Анализ мочи на 17-КС' => 2,
    ),
  ),
  4 => array(
    'report' => true,
    'analysis' => array(
      'Общий анализ крови' => true,
      'Анализ мочи общий' => true,
      'Анализ мочи по Нечипоренко' => 1,
    ),
  ),
  5 => array(
    'report' => true,
    'analysis' => null,
  ),
  6 => array(
    'appointment' => true,
    'analysis' => array(
      'ПЦР-исследование' => 2,
    ),
  ),
  7 => array(
    'report' => true,
    'analysis' => null,
  ),
  8 => array(
    'report' => true,
    'analysis' => array(
      'Общий анализ крови' => true,
      'Анализ мочи общий' => true,
      'Анализ мочи по Нечипоренко' => 1,
    ),
  ),
  9 => array(
    'appointment' => true,
    'analysis' => array(
      'ПЦР-исследование' => 2,
    ),
  ),
  10 => array(
    'report' => true,
    'analysis' => null,
  ),
  11 => array(
    'report' => true,
    'analysis' => null,
  ),
  12 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'УЗИ плода' => true,
      'Общий анализ крови' => true,
      'Анализ мочи общий' => true,
      'Анализ мочи по Нечипоренко' => 1,
    ),
  ),
  13 => array(
    'report' => true,
    'analysis' => null,
  ),
  14 => array(
    'report' => true,
    'analysis' => null,
  ),
  15 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => null,
  ),
  16 => array(
    'report' => true,
    'analysis' => array(
      'УЗИ плода' => 2,
      'Общий анализ крови' => true,
      'Анализ мочи общий' => true,
      'Анализ мочи по Нечипоренко' => 1,
      'ПЦР-исследование' => 2,
      'Бакпосев' => 2,
    ),
  ),
  17 => array(
    'report' => true,
    'analysis' => null,
  ),
  18 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'УЗИ почек' => 1,
    ),
  ),
  19 => array(
    'report' => true,
    'analysis' => null,
  ),
  20 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'Общий анализ крови' => true,
      'Анализ мочи общий' => true,
      'Анализ мочи по Нечипоренко' => 1,
    ),
  ),
  21 => array(
    'report' => true,
    'analysis' => null,
  ),
  22 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'УЗИ плода' => true,
      'Посев мочи' => 1,
    ),
  ),
  23 => array(
    'report' => true,
    'analysis' => null,
  ),
  24 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'Общий анализ крови' => true,
      'Анализ мочи общий' => true,
      'Анализ мочи по Нечипоренко' => 1,
    ),
  ),
  25 => array(
    'report' => true,
    'analysis' => null,
  ),
  26 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => null,
  ),
  27 => array(
    'report' => true,
    'analysis' => null,
  ),
  28 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'УЗИ плода' => true,
      'ЭКГ' => true,
      'Общий анализ крови' => true,
      'Анализ мочи общий' => true,
      'Анализ мочи по Нечипоренко' => 1,
      'УЗИ почек' => 1,
      'ПЦР-исследование' => 2,
      'Бакпосев' => 2,
    ),
  ),
  29 => array(
    'report' => true,
    'analysis' => array(
      'ЭКГ' => true,
    ),
  ),
  30 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'ЭКГ' => true,
      'Мазок на флору' => true,
      'Биохимический анализ крови' => true,
      'RW, ВИЧ, HCV, HBS-Ag' => true,
      'Коагулограмма' => true,
      'Анализ мочи общий' => true,
    ),
  ),
  31 => array(
    'report' => true,
    'analysis' => null,
  ),
  32 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'Общий анализ крови' => true,
      'Анализ мочи общий' => true,
      'Анализ мочи по Нечипоренко' => 1,
    ),
  ),
  33 => array(
    'report' => true,
    'analysis' => null,
  ),
  34 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'Анализ мочи общий' => true,
      'КТГ' => true,
    ),
  ),
  35 => array(
    'report' => true,
    'analysis' => array(
      'УЗИ плода' => 2,
      'ПЦР-исследование' => 2,
      'Бакпосев' => 2,
    ),
  ),
  36 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'Общий анализ крови' => true,
      'Анализ мочи общий' => true,
      'Анализ мочи по Нечипоренко' => 1,
    ),
  ),
  37 => array(
    'report' => true,
    'analysis' => null,
  ),
  38 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'Анализ мочи общий' => true,
    ),
  ),
  39 => array(
    'report' => true,
    'analysis' => null,
  ),
  40 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'Общий анализ крови' => true,
      'Анализ мочи общий' => true,
      'Анализ мочи по Нечипоренко' => 1,
    ),
  ),
  41 => array(
    'report' => true,
    'analysis' => null,
  ),
  42 => array(
    'report' => true,
    'appointment' => true,
    'analysis' => array(
      'Анализ мочи общий' => true,
    ),
  ),
);
$names = array(
  'report' => 'Отчёт',
  'analisys' => 'Анализ',
  'appointment' => 'Приём',
  'procedure' => 'Процедура',
);

$now = new DateTime('now');
$result = array(
  'past' => array(),
  'future' => array(),
);
$defaults = array_reverse($defaults, true);
$maxWeek = rand($currentWeek, 42);
$maxWeek = 42;

foreach ($defaults as $weekNumber => $weekEvents) {
  if ($weekNumber > $maxWeek) {
    continue;
  }
  $key = $weekNumber > $currentWeek ? 'future' : 'past';
  $events = array();
  $index = 1;
  foreach ($weekEvents as $eventType => $variants) {
    if (null === $variants) {
      continue;
    } elseif (true === $variants) {
      $events[] = createEventWithType($eventType, $weekNumber, $index);
      ++$index;
      continue;
    } elseif (is_array($variants)) {
      foreach ($variants as $title => $probability) {
        if (true === $probability) {
          $events[] = event($eventType, $title, $weekNumber, $index);
          ++$index;
        } elseif ($level === $probability || $level > $probability) {
          $events[] = event($eventType, $title, $weekNumber, $index);
          ++$index;
        }
      }
      continue;
    }
  }
  if (rand(0, 10) > 7) {
    $events[] = createEventWithType('procedure', $weekNumber, $index);
  }

  $result[$key][] = array(
    'number' => $weekNumber,
    'events' => $events,
  );
}
//echo var_export($result, true), PHP_EOL;
echo json_encode($result), PHP_EOL;


function createEventWithType($type, $week) {
  global $names;
  $name = $names[$type];
  return event($type, $name, $week);
}

function event($type, $title, $week) {
  global $currentWeek;

  $diff = $week - $currentWeek;
  $date = new DateTime('now');
  if ($diff < 0) {
    $date->sub(new DateInterval('P' . -7*$diff . 'D'));
  } else {
    $date->add(new DateInterval('P' . 7*$diff . 'D'));
  }

  $performed = $week <= $currentWeek;

  if ('report' === $type) {
    $weekStart = clone $date;
    $weekStart->sub(new DateInterval('P7D'));
    $weekEnd   = clone $date;
    $weekEnd->sub(new DateInterval('P1D'));
    $title = 'Отчёт за ' . $weekStart->format('d.m') . '—' . $weekEnd->format('d.m');
  }

  return array(
    'type' => $type,
    'name' => $title,
    'date' => $date->format('d.m.Y'),
    'viewed' => rand(1, 100) < 95,
    'performed' => rand(1, 100) < 95 ? $performed : false,
    'alerts' => array(
      'file' => rand(1, 100) > 90
    ),
    'files' => rand(0, 3),
    'events' => rand(0, 3),
    'comments' => rand(0, 3)
  );
}

function getWeekDate() {
}