  # Password Recovery

  **FR**

  - [ ] The user should be able to retrieve his password by informing his email.
  - [ ] The user shouldn't be able to retrieve his password by informing a non-existent email.
  - [ ] The user should receive an email with instructions to retrieve his password.
    - [ ] Should generate a user token for password recovery
  - [ ] The user should be able to reset his password.
    - [ ] Should hash the user's new password.
    - [ ] Should not be able to reset the user's password after the token is expired.

  **NFR**

  - [ ] Use Mailtrap for email testing during the development phase.
  - [ ] Use Amazon SES for email testing during the production phase.
  - [ ] Send emails in the background
  NOTE: Background jobs

  **Business Requirement**

  - [ ] The email link sent through the user's email to reset a password should expire in two hours.
  - [ ] The user can only reset his own password.
  - [ ] The user needs to confirm his new password after resetting his previous password.

  # Update Profile

  **FR**
  - [ ] The user should be able to update his name, email and password.

  **BR**

  - [ ] The user can't change his email to an email that has already been used.
  - [ ] To update a password the user needs to inform their current password.
  - [ ] To update a password the user needs to confirm his new password.

  # Provider Panel

  **FR**

  - [ ] The provider should be able to list all of his appointments in a given day.
  - [ ] The provider should receive a notification whenever a user creates a new appointment with him.
  - [ ] The provider should be able to visualize his unread notifications.

  **NFR**

  - [ ] The provider's appointment in a given day should be stored in cache.
  - [ ] The provider's notifications should be stored in MongoDB.

  # Business Requirement

  - [ ] The notification should have the unread and read states that can be toggled by the provider.

  # Schedule Service Appointments

  **FR**

  - [ ] The user should be able to list all registered service providers.
  - [ ] The user should be able to list all days from a given month that has at least one available time slot for a given service provider.
  - [ ] The user should be able to list all available time slots in a given day for a given service provider.
  - [ ] The user should be able to make a new appointment with a service provider.

  **NFR**

  - [ ] The provider list should be stored in cache.

  **BR**

  - [ ] All available time slots should be comprised of 1 hour.
  - [ ] The available time slots should be between 8:00 AM and 6:00 PM
  NOTE: The 1st time slot is at 8:00 AM and the last time slot is at 5:00 PM.
  - [ ] The user can't schedule a new appointment with a provider if the time slot is already occupied.
  - [ ] The user can't schedule a new appointment in a time slot that is in the past.
  - [ ] The user can't schedule a new appointment with himself as a provider.
