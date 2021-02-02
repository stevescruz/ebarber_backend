  # Password Recovery

  **FR**

  - [x] The user should be able to retrieve his password by informing his email.
  - [x] The user should not be able to retrieve his password by informing a non-existent email.
  - [x] The user should receive an email with instructions to retrieve his password.
    - [x] Should generate a user token for password recovery
  - [x] The user should be able to reset his password.
    - [x] Should hash the user's new password.
    - [x] Should not be able to reset the user's password after the token is expired.

  **NFR**

  - [x] Use Mailtrap for email testing during the development phase.
  - [x] Use Amazon SES for email testing during the production phase.
  - [ ] Send emails in the background
  NOTE: Background jobs

  **Business Requirement**

  - [x] The email link sent through the user's email to reset a password should expire in two hours.
  - [x] The user can only reset his own password.
  - [x] The user needs to confirm his new password after resetting his previous password.

  # Update Profile

  **FR**
  - [x] The user should be able to update his name, email and password.

  **BR**

  - [x] The user cannot change his email to an email that is already being used by another user.
  - [x] To update a password the user needs to inform his current password.
  - [x] To update a password the user cannot inform his current password incorrectly.
  - [x] To update a password the user needs to confirm his new password.

  # Provider Panel

  **FR**

  - [x] The provider should be able to list all of his appointments in a given day.
  - [x] The provider should receive a notification whenever a user creates a new appointment with him.
  - [ ] The provider should be able to visualize his unread notifications.

  **NFR**

  - [ ] The provider's appointment in a given day should be stored in cache.
  - [x] The provider's notifications should be stored in MongoDB.

  # Business Requirement

  - [x] The notification should have the unread and read states that can be toggled by the provider.

  # Schedule Service Appointments

  **FR**

  - [x] 1. The user should be able to list all registered service providers.
  - [x] 2. The user should be able to list all days, that have at least one available time slot, from a given month for a given service provider.
  - [x] 3. The user should be able to list all available time slots in a given day for a given service provider.
  - [x] 4. The user should be able to make a new appointment with a service provider.

  **NFR**

  - [ ] The provider list should be stored in cache.

  **BR**

  - [x] Should exclude the logged user from the list of providers. (This is for FR #1)
  - [x] All available time slots should be comprised of 1 hour.
  - [x] The available time slots should be between 8:00 AM and 6:00 PM
  NOTE: The 1st time slot is at 8:00 AM and the last time slot is at 5:00 PM.
  - [x] The user cannot schedule a new appointment with a provider if the time slot is already occupied.
  - [x] The user cannot schedule a new appointment in a time slot that is in the past.
  - [x] The user cannot schedule a new appointment with himself as a provider.
