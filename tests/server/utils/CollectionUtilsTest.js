/**
 * Created by Ho on 8/5/2014.
 */

var should = require('should');
var CollectionUtils = require('../../../lib/CollectionUtils');

describe('lib/CollectionUtils', function () {
    describe('#randomSelect', function () {
        it('should return empty array when array input is empty', function () {
            var input = [];
            var output = CollectionUtils.randomSelect(input, 3);
            output.should.be.instanceOf(Array);
            output.length.should.equal(0);
        });

        it('should return empty array when count < 0', function () {
            var input = [1, 2, 3, 4, 5];
            var count = -1;

            var output = CollectionUtils.randomSelect(input, count);
            count.should.below(0);
            output.should.be.instanceOf(Array);
            output.length.should.equal(0);
        });

        it('it should return array with length = count if count > array.length', function () {
            var input = [1, 2, 3, 4, 5],
                count = input.length + 1,
                output = CollectionUtils.randomSelect(input, count);
            output.should.be.instanceOf(Array);

            count.should.above(input.length);
            output.length.should.equal(input.length);
        });

        it('it should return array with length = count if 0 <= count <= array.length', function () {
            var input = [1, 2, 3, 4, 5],
                count = 3,
                output1 = CollectionUtils.randomSelect(input, count),
                output2 = CollectionUtils.randomSelect(input, count);

            output1.should.be.instanceOf(Array);
            count.should.within(0, input.length);
            output1.length.should.equal(count);
            output2.length.should.equal(count);
            output1.should.not.equal(output2);

        });
        it('it should return array with unique elements', function () {
            var input = [1, 2, 3, 4, 5, 6],
                count = 3,
                output1 = CollectionUtils.randomSelect(input, count);

            output1.should.be.instanceOf(Array);
            count.should.within(0, input.length);
            output1.length.should.equal(count);

            var map = {};

            for(var i = 0; i< output1.length; i++){
                if(!map[output1[i]]){
                    map[output1[i]] = 1;
                }else{
                    map[output1[i]] ++;
                }
                map[output1[i]].should.below(2);
            }

        });
    });
});
