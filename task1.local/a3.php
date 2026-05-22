<?php

if (isset($_POST['sex']) && isset($_POST['height'])) {

    $sex = $_POST['sex'];
    $height = intval($_POST['height']);

    if ($height < 140 || $height > 220) {
        echo "Ошибка: неверный рост.";
        exit;
    }

    if ($sex == "man") {
        $ideal = ($height - 100) * 0.9;
        echo "Идеальный вес для мужчины: " . round($ideal, 1) . " кг";
    }
    elseif ($sex == "woman") {
        $ideal = ($height - 100) * 0.85;
        echo "Идеальный вес для женщины: " . round($ideal, 1) . " кг";
    }
    else {
        echo "Ошибка: неверные данные.";
    }

} else {
    echo "Ошибка: данные не получены.";
}

?>