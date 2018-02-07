Feature: Movie card

Scenario: Movie card should have name
    Given I am on home page
    Then I see movie cards loaded
    Then Movie Card should have name

Scenario: should have "raiting" pointer
    Given I am on home page
    Then I see movie cards loaded
    Then Movie Card should have raiting pointer