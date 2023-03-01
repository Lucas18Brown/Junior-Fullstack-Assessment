# frozen_string_literal: true
module Api
  module V1
    class PetsController < ApplicationController
      before_action :set_pet_params, only: %i[edit update destroy]
      def index
        @pets = Pet.filter(filtering_params).order(:featured, :name).page filtering_params[:page]
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
        params.permit(:species, :page, :age, :breed)
      end

      def pet_params
        params.require(:pet).permit(:name, :species, :age, :color, :breed, :favorite_food, :favorite_toy, :featured, :celebrity)
      end

      def set_pet_params
        @pet = Pet.find_by(params[:include])
      end
    end
  end
end
