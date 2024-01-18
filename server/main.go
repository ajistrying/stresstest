package main

import (
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"go.uber.org/zap"
)

type Server struct {
	// Server logger
	Logger *zap.Logger
	// Server router
	Router *chi.Mux
}

func NewServer() *Server {
	// Load environment variables
	godotenv.Load()

	// Create a new server
	server := &Server{
		Logger: NewLogger(),
		Router: chi.NewRouter(),
	}

	return server
}

func (server *Server) StartServer() {
	server.Logger.Info("Server started...")
	http.ListenAndServe(":8080", server.Router)
}

func NewLogger() *zap.Logger {
	if os.Getenv("ENVIRONMENT") == "production" {
		logger, _ := zap.NewProduction()

		return logger
	} else {
		logger, _ := zap.NewDevelopment()

		return logger
	}
}
func main() {
	// Create a new server
	server := NewServer()

	// Start the server
	server.StartServer()
}
