<?php

$phonebook = [
    "+8(123-456-78-90)" => "Иван Иванов",
    "+8(987-654-32-10)" => "Петр Петров",
    "+8(555-111-22-33)" => "Анна Смирнова"
];

$lastname = trim($_POST['lastname']);
$firstname = trim($_POST['firstname']);
$phone = trim($_POST['phone']);

$pattern = "/^\+8\(\d{3}-\d{3}-\d{2}-\d{2}\)$/";

echo "<h3>Результат проверки:</h3>";

if (!preg_match($pattern, $phone)) {
    echo "❌ Неверный формат номера телефона!";
} else {
    echo "✅ Формат телефона корректный.<br><br>";

    if (array_key_exists($phone, $phonebook)) {
        echo "📞 Владелец номера: <strong>" . $phonebook[$phone] . "</strong>";
    } else {
        echo "⚠ Номер не найден в записной книжке.";
    }
}

?>