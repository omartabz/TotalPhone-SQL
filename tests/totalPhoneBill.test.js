import assert from "assert";
import totalPhoneBill from "../totalPhoneBill.js";

describe('The totalPhoneBill function', function () {
    it('takes a takes in a string calls made and smss sent and calculates the total bill for the data provided', function () {
assert.equal('R7.45', totalPhoneBill('call, sms, call, sms, sms'));
    })
    it('takes a takes in a string calls made and smss sent and calculates the total bill for the data provided', function () { 
assert.equal('R3.40', totalPhoneBill('call, sms'));
    })
    it('takes a takes in a string calls made and smss sent and calculates the total bill for the data provided', function () {
assert.equal('R1.30', totalPhoneBill('sms, sms'));
    })
})
