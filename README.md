# Rentify

Rentify is an application where sellers and buyers can meet to facilitate rental transactions.

## Technologies Used

- **Frontend**: React.js, PrimeReact, PrimeFlex
- **Backend**: Spring Framework, PostgreSQL
- **Hosting**:
  - Frontend: Vercel("https://rentify-react-ten.vercel.app/")
  - Backend: Render (including PostgreSQL)

## Note

- The application may take up to 1 minute to load due to being hosted on free services.

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js
- npm (or yarn)
- Java (JDK 22)
- PostgreSQL

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/batrick-swaistan/rentify-react.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd rentify
    ```

3. **Install frontend dependencies**:
    ```sh
    cd frontend
    npm install
    ```

4. **Build and start the frontend**:
    ```sh
    npm run build
    npm start
    ```

5. **Navigate to the backend directory and install dependencies**:
    ```sh
    cd ../backend
    ./mvnw install
    ```

6. **Update application properties**:
    Update the `application.properties` file with your PostgreSQL database credentials.

7. **Run the backend application**:
    ```sh
    ./mvnw spring-boot:run
    ```

## Usage

Once both the frontend and backend are running, you can access the application in your web browser at `http://localhost:3000`.

.
