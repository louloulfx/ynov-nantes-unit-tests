<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test__flatten_array_two_dimensions()
    {
        $array = [1, 2, [3, 4], 5, [6, 7]];
        $expected = [1, 2, 3, 4, 5, 6, 7];
        $this->assertEquals($expected, flatten($array));
    }

    public function test__flatten_array_three_dimensions()
    {
        $array = [1, 2, [3, 4], 5, [6, [7, 8, [9, 10]]]];
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], flatten($array));
    }

    public function test__flatten_failure_not_array()
    {
        $string = "string";
        $this->expectException(TypeError::class);
        flatten($string);
    }
}
