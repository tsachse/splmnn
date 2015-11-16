module Api
  class SectionsController < BaseController

    private

    def section_params
      params.permit(:id,:name,:start,:stop,:medium_id)
    end
  end
end
