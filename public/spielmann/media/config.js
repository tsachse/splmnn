define(['text!/spielmann/media/tmpls/_show_page.html',
        'text!/spielmann/media/tmpls/_repeat_button.html',
	'text!/spielmann/media/tmpls/_video_tag.html',
	'text!/spielmann/media/tmpls/_button_group.html'],
    function(show_page_tmpl,button_tmpl, video_tag_tmpl, button_group_tmpl) {
      return function(nga, sections) {
	var media = nga.entity('media');

	media.listView().fields([
	  nga.field('code'),
	  nga.field('name'),
	  //nga.field('path'),
	 ])
	 .sortField('id')
	 .sortDir('ASC')
	 .listActions(['show','edit']) 
	 .actions(['create', 'delete'])  ;

	media.showView().template(show_page_tmpl).fields([
	  nga.field('code'),
	  nga.field('name'),
	  nga.field('path'),
	  nga.field('v', 'template')
	    .label('')
	    .template(video_tag_tmpl),
	  nga.field('bg', 'template')
	    .label('')
	    .template(button_group_tmpl),
	  nga.field('sections', 'referenced_list')
	    .targetEntity(sections)
	    .targetReferenceField('medium_id')
	    .targetFields([
	      nga.field('name'),
	      nga.field('start'),
	      nga.field('stop'),
	      nga.field('b', 'template')
		.label('')
		.template(button_tmpl)
	    ])
	    .sortField('id')
	    .sortDir('ASC')
	    .listActions(['show','edit'])
	])
	.title('Show item "{{entry.values.name}}"');

	media.creationView().fields([
	  nga.field('code'),
	  nga.field('name'),
	  nga.field('path')
	]);

	media.editionView().fields([
	  nga.field('code'),
	  nga.field('name'),
	  nga.field('path'),
	  nga.field('sections', 'referenced_list')
	    .targetEntity(sections)
	    .targetReferenceField('medium_id')
	    .targetFields([
	      nga.field('name'),
	      nga.field('start'),
	      nga.field('stop')
	    ])
	    .sortField('id')
	    .sortDir('ASC')
	    .listActions(['show','edit'])
	])
	.title('Edit item "{{entry.values.name}}"');

	return media;

      }
    }
);
