<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

// Kiküld egy üzenetet a kliensnek:
echo "data: " . date("H:i:s") . "\n\n";
flush();
?>
