<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase {
    public function test_insert__one_temp() {
        $tracker = new TempTracker();
        $tracker->insert(50);
        $this->assertEquals(50, $tracker->get_max());
        $this->assertEquals(50, $tracker->get_min());
        $this->assertEquals(50, $tracker->get_mean());
    }

    public function test_insert__many_temps() {
        $tracker = new TempTracker();
        $tracker->insert(50);
        $tracker->insert(100);
        $tracker->insert(75);
        $this->assertEquals(100, $tracker->get_max());
        $this->assertEquals(50, $tracker->get_min());
        $this->assertEquals(75, $tracker->get_mean());
    }

    public function test_insert__many_temps_with_same_temp() {
        $tracker = new TempTracker();
        $tracker->insert(50);
        $tracker->insert(50);
        $tracker->insert(50);
        $this->assertEquals(50, $tracker->get_max());
        $this->assertEquals(50, $tracker->get_min());
        $this->assertEquals(50, $tracker->get_mean());
    }

    public function test__insert_failure() {
            $tracker = new TempTracker();
            $this->expectException(TypeError::class);
            $tracker->insert('a');
    }
}