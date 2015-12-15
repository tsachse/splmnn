ActiveAdmin.register Medium do

# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if resource.something?
#   permitted
# end

  permit_params :name, :code, :path

  config.batch_actions = false

  filter :name

  index :download_links => false do
    column :code
    column :name
    actions
  end

  show do
    panel "#{medium.name}" do
      video id: "qt_repeat", src: medium.path, height: 400, controls: true, autobuffer: true, preload: 'auto' do
      end
    end
    columns do
      column do
	panel "Medium" do
	  attributes_table do
	    row :code
	    row :name
	  end
	end
      end
      column do
	panel "Section" do
	  unless medium.sections.empty?
	    table_for medium.sections do
	      column :name do |section|
		link_to section.name, onlick="javascript:media.loadAndRepeat(#{section.start},#{section.stop})"
	      end
	      column :start
	      column :stop
	    end
	  end
	end
      end
    end
  end


end
