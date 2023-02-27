# frozen_string_literal: true

module Api
  module V1
    class PetsController < ApplicationController

      def index
        pets = if params[:species] && %w[dog cat].include?(params[:species])
                 Pet.where(species: params[:species]).order(featured: :asc, name: :asc)
               else
                 Pet.order(featured: :asc, name: :asc)
               end
        render json: pets, status: :ok
      end

    end
  end
end
