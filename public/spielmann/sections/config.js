define([],
    function() {
      return function(nga) {
	var sections = nga.entity('sections'); 

	sections.listView().fields([
	    nga.field('name'),
	    nga.field('start'),
	    nga.field('stop'),
	]);

	sections.showView().fields([
	    nga.field('name'),
	    nga.field('start'),
	    nga.field('stop'),
	])
	.actions(['edit','delete','back'])
	.title('Show item "{{entry.values.name}}"');

	sections.editionView().fields([
	    nga.field('name'),
	    nga.field('start'),
	    nga.field('stop'),
	])
	.actions(['delete','back'])
	.title('Edit item "{{entry.values.name}}"');

	return sections;
      }
    }
);
