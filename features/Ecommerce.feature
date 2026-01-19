Feature: Ecommerce validations

  Scenario: Placing the Order
    Given a login to Ecommerce application with "surajkadam@gmail.com" and "Practice@123"
    When Add "Zara code 3" to Cart 
    Then Verify "Zara code 3" is displayed in the Cart
    When Enter valid details and place the Order
    Then Verify order is present in the OrderHistory
      Given a login to Ecommerce application with "surajkadam@gmail.com" and "Practice@123"