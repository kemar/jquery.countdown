QUnit.test("Markup structure", function (assert) {

    var c = $('#countdown-test').countDown();
    var timeElement = $('#countdown-test > .countdown');

    assert.ok(timeElement.is('time'), "A time element has been created");

    assert.strictEqual(typeof(timeElement.attr('datetime')), 'string', "A datetime attribute has been created");

    assert.strictEqual(timeElement.find('.item:visible').length, 3, "Visible .item elements, correct number");
    assert.strictEqual(timeElement.find('.separator:visible').length, 2, "Visible .separator elements, correct number");

    assert.strictEqual(timeElement.find('.separator').eq(0).text(), ':', "Default separator for hours");
    assert.strictEqual(timeElement.find('.separator').eq(1).text(), ':', "Default separator for minutes");

    assert.strictEqual(timeElement.find('.label-hh').text(), 'hours', "Default hours label");
    assert.strictEqual(timeElement.find('.label-mm').text(), 'minutes', "Default minutes label");
    assert.strictEqual(timeElement.find('.label-ss').text(), 'seconds', "Default seconds label");

});
