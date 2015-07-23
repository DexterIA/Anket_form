<?php
   $json = file_get_contents("php://input");

   $key = '';
   $keys = array_merge(range(0, 9), range('a', 'z'));
   for ($i = 0; $i < 20; $i++) {
       $key .= $keys[array_rand($keys)];
   }

    $file = fopen('saved_forms/'.$key.'.json','w+');
    fwrite($file, $json);
    fclose($file);
?>