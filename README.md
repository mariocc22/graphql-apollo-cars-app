# People and Cars Management App

This web application is designed to efficiently manage and keep track of people and their corresponding cars. Using Apollo server with Express and React Apollo client, this app allows users to perform CRUD (Create, Read, Update, Delete) operations on both people and cars, ensuring smooth and real-time user experience with optimistic UI.

## App Overview

The app is structured around a schema that includes a list of individuals and their associated cars. Each individual's cars are identified by a unique personId. Users can seamlessly create, update, and delete both people and their corresponding cars. The data is initially populated with pre-defined sample data for demonstration purposes.

## App UX Description

### Person Form

The person form is readily available for inputting the first name and last name of a new individual.

### Car Form

The car form facilitates the input of detailed car information, including the year (integer), make (string), model (string), price (float), and the personId (selected from a dropdown with existing person names).

### Person Card

The person card provides a concise display of the individual's first and last name. It includes edit and delete buttons for easy management. Clicking the "LEARN MORE" link navigates to a separate show page displaying the selected person and their associated cars.

### Car Card

The car card showcases the car's specifications, such as year, make, model, price, and the associated person. It offers an edit and delete option. Car cards are nested within the respective person cards, forming a convenient list structure.

### Show Page

The show page provides a comprehensive view of an individual and all their cars. A "GO BACK HOME" link is prominently placed for convenient navigation back to the home page with the forms and the complete list of people and cars.

## Technical Requirements

- All CRUD actions for people and cars are optimized for immediate UI updates.
- Newly added cars are promptly displayed in the corresponding person card, appended at the bottom of the list of owned cars.
- Updates to person and car details are seamlessly reflected in the UI in real-time.
- When a car's personId is updated, it is automatically removed from the previous person's list and appended to the new person's list.
- Newly created cars are automatically appended to the corresponding person's car list.
- The add car form is hidden when there are no people in the database.
- Deleting a person results in the deletion of all associated cars as well.
- All CRUD operations are consistently synchronized with the server.
- The show page includes a separate query to fetch a specific person and all their cars, promoting an efficient and streamlined viewing experience.
- The app ensures proper currency formatting for all price-related figures.

Feel free to explore the app and enjoy its seamless management capabilities!
