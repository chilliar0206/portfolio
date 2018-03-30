
//When button is pressed, it gets the target id, so button pressed id
var btnPress = function(event){
  var target_button;

  target_button = event.target.id;

  console.log(target_button);

  //Pass the button id to this function
  do_something_with_btn_press(target_button);

}


// right now this function figures out if a nav button, dashboard button, or back button was pressed.
var do_something_with_btn_press = function(which_btn){

  var project_active;

  var button = document.getElementById(which_btn);
  var buttonPressedId = which_btn;
  var first_three_letters = which_btn.substring(0,3);

  if(first_three_letters === "nav"){
    nav_btn_pressed(buttonPressedId);

  } else if(button.classList.contains("back_button")) {
    back_btn_pressed(buttonPressedId);

  } else {
    dashboard_btn(buttonPressedId);
  }
}

//Function for if dashboard button is pressed

var dashboard_btn = function(buttonPressed){

  //Identify the div that is currently on screen when button was pressed
  var current_div = document.getElementById(buttonPressed).parentNode.parentNode.parentNode;

  // Initialize corresponding_div variable to the id of the div that corresponds to the button pressed
  //(Ex. resume_div will be the corresponding div to resume_btn)
  var corresponding_div = buttonPressed.replace("btn", "div");

  console.log(corresponding_div, "is the corresponding div");

  //Remove "other_div_trans" class to make corresponding_div slide down into vies
  document.getElementById(corresponding_div).classList.remove("other_div_trans");

  //Add active_div class to corresponding_div since it is now the active class
  document.getElementById(corresponding_div).classList.add("active_div");

  //Add dashboard_trans class to the current_div, will cause the current_div to slide left off screen
  current_div.classList.add("dashboard_trans");

  // Initialize variable nav_btn to the corresponding navigation bar button of the dashboard
  // button pressed and give it class "active_nav" to underline the current selection
  // First check to see if a corresponding navigation bar button exists
  var nav_btn = "nav_" + buttonPressed;
  if(document.getElementById(nav_btn)){
    document.getElementById(nav_btn).classList.add("active_nav");
  }

  // Identify if the dashboard button pressed was related to a project (Ex. Cinemartyrs, Pig_game)
  // If it was a project button, then initialize variable project_active to the id of the selected project div
  if(corresponding_div !== "projects_div" && corresponding_div !== "about_div" && corresponding_div !== "resume_div" && corresponding_div !== "contact_div"){
    project_active = corresponding_div;
    console.log(project_active, "is now active");
  } else {
    project_active = "";
  }
}

// function for if a navigation bar button was pressed
var nav_btn_pressed = function(buttonPressed){

  //Scroll to dashboard section
  window.scrollTo({ top: 520, left: 0, behavior: 'smooth' });

  console.log(buttonPressed);

  // initialize variable nav_button to the nav button pressed
  var nav_button = document.getElementById(buttonPressed);

  // Determine if the nav button pressed is already active. If active, then do nothing.
  if(nav_button.classList.contains("active_nav")){
    return;

  } else{

    //If nav button pressed is not already active

    //Initialize dashboard_div to the dashbaord div
    var dashboard_div = document.getElementById("dashboard");

    // if dashboard_div does not have the class dashboard_trans yet, add it to slide
    // it off screen to the left
    if(!dashboard_div.classList.contains("dashboard_trans")){
      dashboard_div.classList.add("dashboard_trans");
    }

    // initialize variable current_active to the element that has the class "active_nav"
    // if there aren't any active nav buttons, then value will be undefined
    var current_active = document.getElementsByClassName("active_nav")[0];

    // If there is a navigation button that has class "active_nav", remove the class
    // active_nav since it will no longer be active
    if(current_active !== undefined){
    current_active.classList.remove("active_nav");
    }

    // initialize varibale current_divs to the value of any div that has the class
    // "active_div"
    var current_divs = document.getElementsByClassName("active_div")[0];

    // If there is a div that has class active_div
    if(current_divs !== undefined){

      /*
      Check to see if the current_div is projects_div
      If current_divs is "projects_div", slide projects_div to the right by removing
      class "dashboard_trans" and up off the screen by adding class "other_div_trans"
      Also add class "other_div_trans" to all project related divs so they will all slide
      up off the screen.
      */

      if(current_divs.id === "projects_div"){
        document.getElementById("projects_div").classList.remove("dashboard_trans");
        document.getElementById("projects_div").classList.add("other_div_trans");
        document.getElementById("cinemartyrs_div").classList.add("other_div_trans");
        document.getElementById("portfolio_div").classList.add("other_div_trans");
        document.getElementById("budget_calculator_div").classList.add("other_div_trans");
        document.getElementById("pig_game_div").classList.add("other_div_trans");
      }

      //Remove class "active_div" from current div and add class "other_div_trans"
      //to slide current div up off the screen
      console.log("the current div is", current_divs);
      current_divs.classList.remove("active_div");
      current_divs.classList.add("other_div_trans");
    }

    //Give the navigation button that was pressed the class "active_nav" so it will be underlined
    nav_button.classList.add("active_nav");

    // Find the div that corresponds to the nav button pressed and remove the
    // class of "other_div_trans" to slide it on screen and give it "active_div" since it is now active
    corresponding_div = buttonPressed.replace("nav_", "").replace("btn", "div");
    document.getElementById(corresponding_div).classList.remove("other_div_trans");
    document.getElementById(corresponding_div).classList.add("active_div");

    //Clear the project_active variable since it will never be active if a nav button is pressed
    project_active = "";
    console.log("active project is", project_active);

  }
}

//Function for if a back button is pressed

var back_btn_pressed = function(buttonPressed){

  /*
  Initialize the nav_btn varibale to the corresponding navigation button of the back button
  that was pressed. (Ex. if the back button that is on the resume_div is pressed, nav_resume_btn
  will be targeted)
  */
  var nav_btn = "nav_" + buttonPressed.replace("_back", "_btn");

  /*
  Check if a corresponding nav_btn exists. If it exists, then remove "active_nav"
  class from it
  */
  if(document.getElementById(nav_btn)){

    document.getElementById(nav_btn).classList.remove("active_nav");

  }

  //Initialize current_div to the div of the back button that was pressed
  var current_div = document.getElementById(buttonPressed).parentNode;

  // Just initializing dashboard_div variable the dashboard_div element
  var dashboard_div = document.getElementById("dashboard");

  console.log(current_div);

  //Add class "other_div_trans" to current_div so it will slide off screen and remove
  // class "active_div" as well
  current_div.classList.add("other_div_trans");
  current_div.classList.remove("active_div");

  //Check to see if there is an active projects div (Ex. Cinemartyrs, pig_game)
  // If there isn't, the slide the dashboard_div back onto the screen
  if(project_active == ""){

  dashboard_div.classList.remove("dashboard_trans");


  // If there is an active_project div, then make project_active equal to null
  // and slide the projects select div back onto screen because that is the
  // only div that should be seen when hitting the back button on a project div
  } else {
    console.log(project_active, "has been removed from project_active");
    project_active = "";
    document.getElementById("projects_div").classList.remove("dashboard_trans");
  }

}
