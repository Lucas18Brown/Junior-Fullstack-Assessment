# frozen_string_literal: true
module Api
  module V1
    class PetsController < ApplicationController
      before_action :set_pet_params, only: %i[edit update destroy]
      def index
        sort_by = filtering_params[:sort_by]
        sort_column, sort_direction = sort_by.split('_') if sort_by

        # Prevent Injection attacks and check if the sort_column and sort_direction are valid
        if sort_column && sort_direction && Pet.column_names.include?(sort_column) && ['asc', 'desc'].include?(sort_direction)
          @pets = Pet.filter(filtering_params.slice(:page, :per, :species, :age, :breed, :name, :search))
          .order(sort_column => sort_direction)
        else
          @pets = Pet.filter(filtering_params)
          .order(:featured, :name)
        end

        @pets = @pets.page(filtering_params[:page] || 1).per(filtering_params[:per] || 2)

        # Set headers
          headers['X-Total-Count'] = @pets.total_count.to_s
          headers['X-Total-Pages'] = @pets.total_pages.to_s
          headers['X-Page'] = @pets.current_page.to_s
          headers['X-Per-Page'] = @pets.limit_value.to_s

        render json: @pets, status: :ok
      end

      def new
        @pet = Pet.new
      end

      def create
        @pet = Pet.create(pet_params)
        if @pet.save
          redirect_to @pet
        else
          render 'new'
        end
      end

      def update
        respond_to do |format|
          if @pet.update(pet_params)
            format.html { redirect_to @pet, notice: "Pet was successfully updated." }
            format.json { render @pets, status: :ok, location: @pet }
          else
            format.html { render :edit, status: :unprocessable_entity }
            format.json { render json: @pet.errors.full_messages, status: :unprocessable_entity }
          end
        end
      end

      def destroy
        @pet.destroy
        respond_to do |format|
          format.html { redirect_to api_v1_pets_path, notice: "Pet was successfully destroyed." }
          format.json { head :no_content }
        end
      end

      private

      def filtering_params
        params.permit(:page, :per, :species, :age, :breed, :name, :search, :sort_by)
      end

      def pet_params
        params.require(:pet).permit(:name, :species, :age, :color, :breed, :favorite_food, :favorite_toy, :featured, :celebrity)
      end

      def set_pet_params
        @pet = Pet.find(params[:id])
      end
    end
  end
end
