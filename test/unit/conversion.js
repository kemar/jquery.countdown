QUnit.test("sToMs()", function (assert) {
    var c = $('<div>00:00:01</div>').countDown();
    assert.strictEqual(c.countDown('sToMs', '0'), 0);
    assert.strictEqual(c.countDown('sToMs', '1'), 1000);
    assert.strictEqual(c.countDown('sToMs', '10'), 10000);
});

QUnit.test("mToMs()", function (assert) {
    var c = $('<div>00:00:01</div>').countDown();
    assert.strictEqual(c.countDown('mToMs', '0'), 0);
    assert.strictEqual(c.countDown('mToMs', '1'), 60000);
    assert.strictEqual(c.countDown('mToMs', '10'), 600000);
});

QUnit.test("hToMs()", function (assert) {
    var c = $('<div>00:00:01</div>').countDown();
    assert.strictEqual(c.countDown('hToMs', '0'), 0);
    assert.strictEqual(c.countDown('hToMs', '1'), 3600000);
    assert.strictEqual(c.countDown('hToMs', '10'), 36000000);
});

QUnit.test("dToMs()", function (assert) {
    var c = $('<div>00:00:01</div>').countDown();
    assert.strictEqual(c.countDown('dToMs', '0'), 0);
    assert.strictEqual(c.countDown('dToMs', '1'), 86400000);
    assert.strictEqual(c.countDown('dToMs', '10'), 864000000);
});

QUnit.test("msToS()", function (assert) {

    var c, timedelta;
    c = $('<div>00:00:01</div>').countDown();

    timedelta = c.countDown('sToMs', '0');
    assert.strictEqual(c.countDown('msToS', timedelta), 0);

    timedelta = c.countDown('sToMs', '59');
    assert.strictEqual(c.countDown('msToS', timedelta), 59);

    timedelta = c.countDown('dToMs', '365') + c.countDown('sToMs', '59');
    assert.strictEqual(c.countDown('msToS', timedelta), 59);

});

QUnit.test("msToM()", function (assert) {

    var c, timedelta;
    c = $('<div>00:00:01</div>').countDown();

    timedelta = c.countDown('mToMs', '0');
    assert.strictEqual(c.countDown('msToM', timedelta), 0);

    timedelta = c.countDown('mToMs', '59');
    assert.strictEqual(c.countDown('msToM', timedelta), 59);

    timedelta = c.countDown('dToMs', '365') + c.countDown('mToMs', '59');
    assert.strictEqual(c.countDown('msToM', timedelta), 59);

});

QUnit.test("msToH()", function (assert) {

    var c, timedelta;
    c = $('<div>00:00:01</div>').countDown();

    timedelta = c.countDown('hToMs', '0');
    assert.strictEqual(c.countDown('msToH', timedelta), 0);

    timedelta = c.countDown('hToMs', '23');
    assert.strictEqual(c.countDown('msToH', timedelta), 23);

    timedelta = c.countDown('dToMs', '365') + c.countDown('hToMs', '23');
    assert.strictEqual(c.countDown('msToH', timedelta), 23);

});

QUnit.test("msToD()", function (assert) {

    var c, timedelta;
    c = $('<div>00:00:01</div>').countDown();

    timedelta = c.countDown('dToMs', '0');
    assert.strictEqual(c.countDown('msToD', timedelta), 0);

    timedelta = c.countDown('dToMs', '365') + c.countDown('hToMs', '24');
    assert.strictEqual(c.countDown('msToD', timedelta), 366);

    timedelta = c.countDown('hToMs', '23');
    assert.strictEqual(c.countDown('msToD', timedelta), 0);

});
