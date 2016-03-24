QUnit.test("Events - time.tick", function (assert) {

    assert.expect(8);
    var done = assert.async(8);

    $('<div>00:00:10</div>')
      .countDown()
      .on('time.tick', function (ev, ms) {
          assert.ok(true, "time.tick triggered, " + ms + "ms remaining.");
          done();
      });

});

QUnit.test("Events - time.elapsed", function (assert) {

    assert.expect(1);
    var done = assert.async();

    $('<div>00:00:02</div>')
      .countDown()
      .on('time.elapsed', function (ev) {
          assert.ok(true, "time.elapsed triggered");
          done();
      });

});
