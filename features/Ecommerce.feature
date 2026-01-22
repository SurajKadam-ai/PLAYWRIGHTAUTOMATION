Feature: Ecommerce validations
@Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "surajkadam@gmail.com" and "Practice@123"
    When Add "ZARA COAT 3" to Cart 
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and place the Order
    Then Verify order is present in the OrderHistory
      # Given a login to Ecommerce application with "surajkadam@gmail.com" and "Practice@123"

@Validations
  Scenario Outline: Scenario Outline name: Checking Error Message
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
    |       username      |       password    |
    |surajkadam@gmail.com |   Practice@123    |
    |hello@123.com 		    |   Iamhello@123    |