/**
 * Created by Ho on 8/3/2014.
 */


var should = require('should');
var SlugFactory = require('../../../lib/SlugFactory');
var _ = require('lodash');


describe('lib/SlugFactory',function(){

    it("should have createSlug method",function(){
        SlugFactory.createSlug.should.be.type('function')
    });

    describe('#createSlug',function(){
        it('should replace white space by "-"',function(){
           var source = 'nguyen hai ho';
           var expect = 'nguyen-hai-ho';
           var slug = SlugFactory.createSlug(source);
           slug.should.be.equal(expect);
        });

        it('should transform Upper Case to Lower Case',function(){
            var source = 'NGUYEN HAI HO';
            var expect = 'nguyen-hai-ho';
            var slug = SlugFactory.createSlug(source);
            slug.should.be.equal(expect);
        });

        it('should replace special characters',function(){
            var source = "@_#_$_%_^_&_*_._,_+_=_\\_(_)_\r_\n";
            var expect = 'at_sharp_dolar_percent_-_and_-_dot_-_plus_equal_-_-_-_-_-';
            var slug = SlugFactory.createSlug(source);
            slug.should.be.equal(expect);
        });

        it('should remove unicode',function(){
            var data = [
                {"á":"a"},{"à":"a"},{"ạ":"a"},{"ả":"a"},{"ã":"a"},{"ă":"a"},{"ắ":"a"},{"ằ":"a"},{"ặ":"a"},
                {"ẳ":"a"},{"ẵ":"a"},{"â":"a"},{"ấ":"a"},{"ầ":"a"},{"ậ":"a"},{"ẩ":"a"},{"ẫ":"a"},{"é":"e"},
                {"è":"e"},{"ẹ":"e"},{"ẻ":"e"},{"ẽ":"e"},{"ê":"e"},{"ế":"e"},{"ề":"e"},{"ệ":"e"},{"ể":"e"},
                {"ễ":"e"},{"ó":"o"},{"ò":"o"},{"ọ":"o"},{"ỏ":"o"},{"õ":"o"},{"ơ":"o"},{"ớ":"o"},{"ờ":"o"},
                {"ợ":"o"},{"ở":"o"},{"ỡ":"o"},{"ô":"o"},{"ố":"o"},{"ồ":"o"},{"ộ":"o"},{"ổ":"o"},{"ỗ":"o"},
                {"í":"i"},{"ì":"i"},{"ị":"i"},{"ỉ":"i"},{"ĩ":"i"},{"ý":"y"},{"ỳ":"y"},{"ỵ":"y"},{"ỷ":"y"},
                {"ỹ":"y"},{"ú":"u"},{"ù":"u"},{"ụ":"u"},{"ủ":"u"},{"ũ":"u"},{"ư":"u"},{"ứ":"u"},{"ừ":"u"},
                {"ự":"u"},{"ử":"u"},{"ữ":"u"},{"đ":"d"}
            ];
            //get unicodes aarray from mapping.
           var unicodes = _.map(data,function(t){return _.keys(t)[0]});
            //get replace char from key
           var expects = _.map(data, function(t){return _.values(t)[0]});



            var source = unicodes.join('-');
            var expect = expects.join('-');

            var slug = SlugFactory.createSlug(source);
            //assert
            slug.should.equal(expect);
        });
    });

});