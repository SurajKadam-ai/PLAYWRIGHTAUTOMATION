Feature: Ecommerce validations
@Validations
  Scenario Outline: Scenario Outline name: Checking Error Message
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    |       username      |       password    |
    |surajkadam@gmail.com |   Practice@123    |
    |hello@123.com 		  |   Iamhello@123    |