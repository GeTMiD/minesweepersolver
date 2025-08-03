
var textTableTag;//יוצר טבלה
var Notmines = 0, mines = 0, gamemines = 0, gamemines1, Findingmines = false;
var FindingMinesRandom = false, CheckBoard = [,]; 
var num = 0;
/*
var Row = parseInt(prompt("Enter Board Length: ", 16));
var Col = parseInt(prompt("Enter Board Width: ", 16));
var TotalMines = parseInt(prompt("Enter the total amount of mines: ", 40)); 
*/
var Row = 9, Col = 9, TotalMines = 10; // default board size
var firstRow, firstCol;
var audioWin = new Audio('win.mp3'); // win sound
var Notmines = 0, mines = 0;
var CellSize = 40;

BuildBoard(); // initiates game sequence


function Restart() {
    var ezer_id = 0; // used to find current cell id, instead of math.(current_sh * total_col + current_amuda)
    for (var i = 0; i < Row; i++) {
        for (var j = 0; j < Col; j++) {
            Board[i][j] = -1;
            document.getElementById(ezer_id).innerHTML = "";
            document.getElementById(ezer_id).style.backgroundColor = "#b9b9b9";
            ezer_id++;
        }
    }
    CurrentMines(); //updates analog text to new board

}

function ChangeValues() {
    // parseInt auto rounds *down* floats to integers
    // pulls info from input boxes placed in webpage modal.
    Row = parseInt(document.getElementById("Row").value);
    if (!Number.isInteger(Row) || Row < 1) {
        Row = 9;
    }
    Col = parseInt(document.getElementById("Col").value); //Cast to int
    if (!Number.isInteger(Col) || Col < 1) { // Prevent Floats
        Col = 9;
    }
    TotalMines = parseInt(document.getElementById("Mines").value);
    if (!Number.isInteger(TotalMines) || TotalMines > Col * Row || TotalMines < 1) { // meant to prevent more mines than cells
        TotalMines = 10;
    }
    CellSize = parseInt(document.getElementById("CellSize").value);
    if (!Number.isInteger(CellSize) || CellSize < 1)
        CellSize = 40;

    BuildBoard();
} 
function CurrentMines() {
    var counter = 0; // iterates through board and raises counter by one everytime a mine is found
    for (var i = 0; i < Row; i++) {
        for (var j = 0; j < Col; j++) {
            if (Board[i][j] == 9)
                counter++;
        }
    }
    document.getElementById("MineCounter").innerHTML = "You Found " + counter + " out of " + TotalMines + " mines.";
    MinesLeft(counter);
}

function MinesLeft(CurrentMines) {

    var MinesMana = TotalMines - CurrentMines;
    if (MinesMana == 0) {
        document.getElementById("MineLeft").innerHTML = "GG!"; //changes analog text to gg when game is over.
        audioWin.play(); //plays win music
        return 0;// stops function
    }
    else if (MinesMana < 0) { // prevents showing a negative amount of mines. shows error message 
        //if user accidently entered too many mines.
        document.getElementById("MineLeft").innerHTML = "Something Went Wrong, check your board or re-enter how many mines are there.";
        return 0; //stops function
    }
    //incas none of above conditions exist, displays mine amount in analog text.
    document.getElementById("MineLeft").innerHTML = "You have: " + MinesMana + " mines left";

}


function BuildBoard() {
    //builds board as a table and injects to paragraph in html.
    var num = 0;
    textTableTag = "<table style='background-color:#BDBDBD;'border='3'>";
    for (sh = 0; sh < Row; sh++) {
        textTableTag += "<tr>";
        for (am = 0; am < Col; am++) {
            textTableTag = textTableTag + "<td id='" + num +
                "' onclick='SwitchNum(this);' style='width:" + CellSize + "px; height:" + CellSize + "px;'>  </td>";
            num++;
        }
        textTableTag += "</tr>";
    }
    textTableTag += "</table>";
    document.getElementById("Board").innerHTML = textTableTag;

    Board = new Array(Row);
    for (var i = 0; i < Board.length; i++) {
        Board[i] = new Array(Col);
    }
    for (var i = 0; i < Row; i++) {
        for (var j = 0; j < Col; j++) {
            Board[i][j] = -1;
        }
    }
    CurrentMines();
}


function SwitchNum(currentThis) {
    // helps user iterate through all relevant numbers from -1 (grey), to 9 (mine)
    var id = currentThis.id;
    firstRow = Math.floor(id / Col);
    firstCol = id % Col;
    if (Board[firstRow][firstCol] == -1) { // (blank)
        document.getElementById(id).style.backgroundColor = "#808080";
        document.getElementById(id).style.color = "#808080";
        Board[firstRow][firstCol] = 0;
    }
    else {
        if (Board[firstRow][firstCol] == 0) { // num 1
            document.getElementById(id).innerHTML = 1;
            document.getElementById(id).style.color = "blue";
            document.getElementById(id).style.backgroundColor = "#808080";
            Board[firstRow][firstCol] = 1;
        }
        else {
            if (Board[firstRow][firstCol] == 1) { // num 2
                document.getElementById(id).innerHTML = 2;
                document.getElementById(id).style.color = "green";
                document.getElementById(id).style.backgroundColor = "#808080";
                Board[firstRow][firstCol] = 2;
            }
            else {
                if (Board[firstRow][firstCol] == 2) {// num 3
                    document.getElementById(id).innerHTML = 3;
                    document.getElementById(id).style.color = "red";
                    document.getElementById(id).style.backgroundColor = "#808080";
                    Board[firstRow][firstCol] = 3;
                }
                else {
                    if (Board[firstRow][firstCol] == 3) {// num 4
                        document.getElementById(id).innerHTML = 4;
                        document.getElementById(id).style.color = "darkblue";
                        document.getElementById(id).style.backgroundColor = "#808080";
                        Board[firstRow][firstCol] = 4;
                    }
                    else {
                        if (Board[firstRow][firstCol] == 4) {// num 5
                            document.getElementById(id).innerHTML = 5;
                            document.getElementById(id).style.color = "#darkred";
                            document.getElementById(id).style.backgroundColor = "#808080";
                            Board[firstRow][firstCol] = 5;
                        }
                        else {
                            if (Board[firstRow][firstCol] == 5) {// num 6
                                document.getElementById(id).innerHTML = 6;
                                document.getElementById(id).style.color = "#2ea297";
                                document.getElementById(id).style.backgroundColor = "#808080";
                                Board[firstRow][firstCol] = 6;
                            }
                            else {
                                if (Board[firstRow][firstCol] == 6) {// num 7
                                    document.getElementById(id).innerHTML = 7;
                                    document.getElementById(id).style.color = "black";
                                    document.getElementById(id).style.backgroundColor = "#808080";
                                    Board[firstRow][firstCol] = 7;
                                }
                                else {
                                    if (Board[firstRow][firstCol] == 7) {// num 8
                                        document.getElementById(id).innerHTML = 8;
                                        document.getElementById(id).style.color = "#D3D3D3";
                                        document.getElementById(id).style.backgroundColor = "#808080";
                                        Board[firstRow][firstCol] = 8;
                                    }
                                    else {
                                        if (Board[firstRow][firstCol] == 8) { // num 9
                                            document.getElementById(id).innerHTML = "";
                                            document.getElementById(id).style.color = "red";
                                            document.getElementById(id).style.backgroundColor = "red";
                                            Board[firstRow][firstCol] = 9;
                                        }
                                        else {
                                            if (Board[firstRow][firstCol] == 9) {// grey
                                                document.getElementById(id).innerHTML = "";
                                                document.getElementById(id).style.color = "black";
                                                document.getElementById(id).style.backgroundColor = "#b9b9b9";
                                                Board[firstRow][firstCol] = -1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function FindMinesMain(){ //main game function
    Findingmines = false; // sets to false, when true, means new data on board has been received.
    for (sh = 0; sh < Row; sh++) {
        for (am = 0; am < Col; am++) { //iterates through board
            if (Board[sh][am] != 0 && Board[sh][am] != -1 && Board[sh][am] != 9) { // makes sure check doesn't run on a bomb.
                if (am == 0 || am == Col - 1 || sh == 0 || sh == Row - 1) {
                    if (sh == 0 && am == 0) {
                        CheckUpLeftCorner(Board[sh][am]);
                    } else {
                        if (sh == 0 && am == Col - 1) {
                            CheckUpRightCorner(Board[sh][am]);
                        } else {
                            if (sh == Row - 1 && am == 0) {
                                CheckDownLeftCorner(Board[sh][am]);
                            } else {
                                if (sh == Row - 1 && am == Col - 1) {
                                    CheckDownRightCorner(Board[sh][am]);
                                } else {
                                    if (sh == 0 && am < Col - 1 && am > 0) {
                                        CheckTopRow(Board[sh][am]);
                                    } else {
                                        if (sh == Row - 1 && am < Col - 1 && am > 0) {
                                            CheckBottomRow(Board[sh][am]);
                                        } else {
                                            if (am == 0 && sh < Row - 1 && sh > 0) {
                                                CheckLeftCol(Board[sh][am]);
                                            } else {
                                                if (am == Col - 1 && sh < Row - 1 && sh > 0) {
                                                    CheckRightCol(Board[sh][am]);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    FindMinesCenter(Board[sh][am]);
                }
                Notmines = 0; // resets none-mine counter
                mines = 0; // resets mine counter
            }
        }
    }

    if (Findingmines == false) { // If no new info is found, sends to next function
        FindMinesPattern(); // finds mines by checking for patterns
        //ab = false;
    }
    CurrentMines(); // After everything is checked, sends to Current mines to update text.
}

function CheckUpLeftCorner(c) {//See @CheckMinesCenter() for notes.
    if (-1 < Board[sh][am + 1] && Board[sh][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am + 1] && Board[sh + 1][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am] && Board[sh + 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am] == 9) {
            mines++;
        }
    }
    if (3 - Notmines == c) {
        if (-1 < !Board[sh][am + 1] && Board[sh][am + 1] < !9) {
            Board[sh][am + 1] = 9;
            document.getElementById(sh * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        } 
        if (-1 < !Board[sh + 1][am + 1] && Board[sh + 1][am + 1] < !9) {
            Board[sh + 1][am + 1] = 9;
            document.getElementById((sh + 1) * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        } 
        if (-1 < !Board[sh + 1][am] && Board[sh + 1][am] < !9) {
            Board[sh + 1][am] = 9;
            document.getElementById((sh + 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        }
    } else {
        if (mines == c) {
            if (-1 == Board[sh][am + 1]) {
                document.getElementById(sh * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh + 1][am + 1]) {
                document.getElementById((sh + 1) * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh + 1][am]) {
                document.getElementById((sh + 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            }
        }
    }
}

function CheckUpRightCorner(c) {//See @CheckMinesCenter() for notes.
    if (-1 < Board[sh][am - 1] && Board[sh][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am - 1] && Board[sh + 1][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am] && Board[sh + 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am] == 9) {
            mines++;
        }
    }
    if (3 - Notmines == c) {
        if (-1 < !Board[sh][am - 1] && Board[sh][am - 1] < !9) {
            Board[sh][am - 1] = 9;
            document.getElementById(am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh + 1][am - 1] && Board[sh + 1][am - 1] < !9) {
            Board[sh + 1][am - 1] = 9;
            document.getElementById((sh + 1) * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh + 1][am] && Board[sh + 1][am] < !9) {
            Board[sh + 1][am] = 9;
            document.getElementById((sh + 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        }
    } else {
        if (mines == c) {
            if (-1 == Board[sh][am - 1]) {
                document.getElementById(am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh + 1][am - 1]) {
                document.getElementById((sh + 1) * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh + 1][am]) {
                document.getElementById((sh + 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            }
        }
    }
}

function CheckDownLeftCorner(c) {//See @CheckMinesCenter() for notes.
    if (-1 < Board[sh][am + 1] && Board[sh][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh - 1][am + 1] && Board[sh - 1][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh - 1][am] && Board[sh - 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am] == 9) {
            mines++;
        }
    }
    if (3 - Notmines == c) {
        if (-1 < !Board[sh][am + 1] && Board[sh][am + 1] < !9) {
            Board[sh][am + 1] = 9;
            document.getElementById(sh * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh - 1][am + 1] && Board[sh - 1][am + 1] < !9) {
            Board[sh - 1][am + 1] = 9;
            document.getElementById((sh - 1) * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        } if (-1 < !Board[sh - 1][am] && Board[sh - 1][am] < !9) {
            Board[sh - 1][am] = 9;
            document.getElementById((sh - 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        }
    } else {
        if (mines == c) {
            if (-1 == Board[sh][am + 1]) {
                document.getElementById(sh * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh - 1][am + 1]) {
                document.getElementById((sh - 1) * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh - 1][am]) {
                document.getElementById((sh - 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            }
        }
    }
}

function CheckDownRightCorner(c) {//See @CheckMinesCenter() for notes.
    if (-1 < Board[sh][am - 1] && Board[sh][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh - 1][am - 1] && Board[sh - 1][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh - 1][am] && Board[sh - 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am] == 9) {
            mines++;
        }
    }
    if (3 - Notmines == c) {
        if (-1 < !Board[sh][am - 1] && Board[sh][am - 1] < !9) {
            Board[sh][am - 1] = 9;
            document.getElementById(sh * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh - 1][am - 1] && Board[sh - 1][am - 1] < !9) {
            Board[sh - 1][am - 1] = 9;
            document.getElementById((sh - 1) * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh - 1][am] && Board[sh - 1][am] < !9) {
            Board[sh - 1][am] = 9;
            document.getElementById((sh - 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        }
    } else {
        if (mines == c) {
            if (-1 == Board[sh][am - 1]) {
                document.getElementById(sh * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh - 1][am - 1]) {
                document.getElementById((sh - 1) * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh - 1][am]) {
                document.getElementById((sh - 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            }
        }
    }
}

function CheckTopRow(c) {//See @CheckMinesCenter() for notes.
    if (-1 < Board[sh][am - 1] && Board[sh][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am - 1] && Board[sh + 1][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am] && Board[sh + 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am + 1] && Board[sh + 1][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh][am + 1] && Board[sh][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am + 1] == 9) {
            mines++;
        }
    }
    if (5 - Notmines == c) {
        if (-1 < !Board[sh][am - 1] && Board[sh][am - 1] < !9) {
            Board[sh][am - 1] = 9;
            document.getElementById(am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh + 1][am - 1] && Board[sh + 1][am - 1] < !9) {
            Board[sh + 1][am - 1] = 9;
            document.getElementById((sh + 1) * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh + 1][am] && Board[sh + 1][am] < !9) {
            Board[sh + 1][am] = 9;
            document.getElementById((sh + 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh + 1][am + 1] && Board[sh + 1][am + 1] < !9) {
            Board[sh + 1][am + 1] = 9;
            document.getElementById((sh + 1) * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh][am + 1] && Board[sh][am + 1] < !9) {
            Board[sh][am + 1] = 9;
            document.getElementById(sh * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
    } else {
        if (mines == c) {
            if (-1 == Board[sh][am - 1]) {
                document.getElementById(am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh + 1][am - 1]) {
                document.getElementById((sh + 1) * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh + 1][am]) {
                document.getElementById((sh + 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh + 1][am + 1]) {
                document.getElementById((sh + 1) * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh][am + 1]) {
                document.getElementById(sh * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            }
        }
    }
}

function CheckBottomRow(c) {//See @CheckMinesCenter() for notes.
    if (-1 < Board[sh][am - 1] && Board[sh][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh - 1][am - 1] && Board[sh - 1][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh - 1][am] && Board[sh - 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh - 1][am + 1] && Board[sh - 1][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh][am + 1] && Board[sh][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am + 1] == 9) {
            mines++;
        }
    }
    if (5 - Notmines == c) {
        if (-1 < !Board[sh][am - 1] && Board[sh][am - 1] < !9) {
            Board[sh][am - 1] = 9;
            document.getElementById((sh) * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh - 1][am - 1] && Board[sh - 1][am - 1] < !9) {
            Board[sh - 1][am - 1] = 9;
            document.getElementById((sh - 1) * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh - 1][am] && Board[sh - 1][am] < !9) {
            Board[sh - 1][am] = 9;
            document.getElementById((sh - 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh - 1][am + 1] && Board[sh - 1][am + 1] < !9) {
            Board[sh - 1][am + 1] = 9;
            document.getElementById((sh - 1) * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh][am + 1] && Board[sh][am + 1] < !9) {
            Board[sh][am + 1] = 9;
            document.getElementById(sh * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
    } else {
        if (mines == c) {
            if (-1 == Board[sh][am - 1]) {
                document.getElementById((sh) * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh - 1][am - 1]) {
                document.getElementById((sh - 1) * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh - 1][am]) {
                document.getElementById((sh - 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh - 1][am + 1]) {
                document.getElementById((sh - 1) * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh][am + 1]) {
                document.getElementById(sh * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            }
        }
    }
}   

function CheckLeftCol(c) {//See @CheckMinesCenter() for notes.
    if (-1 < Board[sh - 1][am] && Board[sh - 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh - 1][am + 1] && Board[sh - 1][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh][am + 1] && Board[sh][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am + 1] && Board[sh + 1][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am] && Board[sh + 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am] == 9) {
            mines++;
        }
    }
    if (5 - Notmines == c) {
        if (-1 < !Board[sh - 1][am] && Board[sh - 1][am] < !9) {
            Board[sh - 1][am] = 9;
            document.getElementById((sh - 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh - 1][am + 1] && Board[sh - 1][am + 1] < !9) {
            Board[sh - 1][am + 1] = 9;
            document.getElementById((sh - 1) * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh][am + 1] && Board[sh][am + 1] < !9) {
            Board[sh][am + 1] = 9;
            document.getElementById((sh) * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh + 1][am + 1] && Board[sh + 1][am + 1] < !9) {
            Board[sh + 1][am + 1] = 9;
            document.getElementById((sh + 1) * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh + 1][am] && Board[sh + 1][am] < !9) {
            Board[sh + 1][am] = 9;
            document.getElementById((sh + 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        }
    } else {
        if (mines == c) {
            if (-1 == Board[sh - 1][am]) {
                document.getElementById((sh - 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh - 1][am + 1]) {
                document.getElementById((sh - 1) * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh][am + 1]) {
                document.getElementById((sh) * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh + 1][am + 1]) {
                document.getElementById((sh + 1) * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh + 1][am]) {
                document.getElementById((sh + 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            }
        }
    }
}

function CheckRightCol(c) {//See @CheckMinesCenter() for notes.
    if (-1 < Board[sh - 1][am] && Board[sh - 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh - 1][am - 1] && Board[sh - 1][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh][am - 1] && Board[sh][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am - 1] && Board[sh + 1][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am] && Board[sh + 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am] == 9) {
            mines++;
        }
    }
    if (5 - Notmines == c) {
        if (-1 < !Board[sh - 1][am] && Board[sh - 1][am] < !9) {
            Board[sh - 1][am] = 9;
            document.getElementById((sh - 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh - 1][am - 1] && Board[sh - 1][am - 1] < !9) {
            Board[sh - 1][am - 1] = 9;
            document.getElementById((sh - 1) * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh][am - 1] && Board[sh][am - 1] < !9) {
            Board[sh][am - 1] = 9;
            document.getElementById((sh) * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh + 1][am - 1] && Board[sh + 1][am - 1] < !9) {
            Board[sh + 1][am - 1] = 9;
            document.getElementById((sh + 1) * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
        if (-1 < !Board[sh + 1][am] && Board[sh + 1][am] < !9) {
            Board[sh + 1][am] = 9;
            document.getElementById((sh + 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        }
    } else {
        if (mines == c) {
            if (-1 == Board[sh - 1][am]) {
                document.getElementById((sh - 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh - 1][am - 1]) {
                document.getElementById((sh - 1) * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh][am - 1]) {
                document.getElementById((sh) * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh + 1][am - 1]) {
                document.getElementById((sh + 1) * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
            if (-1 == Board[sh + 1][am]) {
                document.getElementById((sh + 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            }
        }
    }
}

function FindMinesCenter(c) { //Checks for mines, uses cell number to identify how many mines are supposed to be around, 
    // logic is made around how the game is built, so it checks the 8 squares around, and there are already the same amount of mines 
    // known as the number suggests, every other square is green, same for red, if there are exactly x mines missing, and the program find
    // all numbers but x sqaures, means they are all mines.
    if (-1 < Board[sh - 1][am - 1] && Board[sh - 1][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh - 1][am] && Board[sh - 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh - 1][am + 1] && Board[sh - 1][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh - 1][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh][am + 1] && Board[sh][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am + 1] && Board[sh + 1][am + 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am + 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am] && Board[sh + 1][am] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh + 1][am - 1] && Board[sh + 1][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh + 1][am - 1] == 9) {
            mines++;
        }
    }
    if (-1 < Board[sh][am - 1] && Board[sh][am - 1] < 9) {
        Notmines++;
    } else {
        if (Board[sh][am - 1] == 9) {
            mines++;
        }
    }
    if (8 - Notmines == c) {
        if (-1 < !Board[sh - 1][am - 1] && Board[sh - 1][am - 1] < !9) {
            Board[sh - 1][am - 1] = 9;
            document.getElementById((sh - 1) * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        } if (-1 < !Board[sh - 1][am] && Board[sh - 1][am] < !9) {
            Board[sh - 1][am] = 9;
            document.getElementById((sh - 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        } if (-1 < !Board[sh - 1][am + 1] && Board[sh - 1][am + 1] < !9) {
            Board[sh - 1][am + 1] = 9;
            document.getElementById((sh - 1) * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        } if (-1 < !Board[sh][am + 1] && Board[sh][am + 1] < !9) {
            Board[sh][am + 1] = 9;
            document.getElementById((sh) * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        } if (-1 < !Board[sh + 1][am + 1] && Board[sh + 1][am + 1] < !9) {
            Board[sh + 1][am + 1] = 9;
            document.getElementById((sh + 1) * Col + am + 1).style.backgroundColor = "Red";
            Findingmines = true;
        } if (-1 < !Board[sh + 1][am] && Board[sh + 1][am] < !9) {
            Board[sh + 1][am] = 9;
            document.getElementById((sh + 1) * Col + am).style.backgroundColor = "Red";
            Findingmines = true;
        } if (-1 < !Board[sh + 1][am - 1] && Board[sh + 1][am - 1] < !9) {
            Board[sh + 1][am - 1] = 9;
            document.getElementById((sh + 1) * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        } if (-1 < !Board[sh][am - 1] && Board[sh][am - 1] < !9) {
            Board[sh][am - 1] = 9;
            document.getElementById((sh) * Col + am - 1).style.backgroundColor = "Red";
            Findingmines = true;
        }
    } else {
        if (mines == c ) {
            if (-1 == Board[sh - 1][am - 1]) {
                document.getElementById((sh - 1) * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            } if (-1 == Board[sh - 1][am]) {
                document.getElementById((sh - 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            } if (-1 == Board[sh - 1][am + 1]) {
                document.getElementById((sh - 1) * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            } if (-1 == Board[sh][am + 1]) {
                document.getElementById(sh * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            } if (-1 == Board[sh + 1][am + 1]) {
                document.getElementById((sh + 1) * Col + am + 1).style.backgroundColor = "green";
                Findingmines = true;
            } if (-1 == Board[sh + 1][am]) {
                document.getElementById((sh + 1) * Col + am).style.backgroundColor = "green";
                Findingmines = true;
            } if (-1 == Board[sh + 1][am - 1]) {
                document.getElementById((sh + 1) * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            } if (-1 == Board[sh][am - 1]) {
                document.getElementById((sh) * Col + am - 1).style.backgroundColor = "green";
                Findingmines = true;
            }
        }
    }
}

function FindMinesPattern() { //finds mines by pattern, more in user guide, in general - uses premade pattenrs to identify common
    //situations where you can find mines in more complex ways than other FindMines Functions, there are regions that each is for every
    // form where the function might appear.
    for (sh = 1; sh < Row - 1; sh++) {
        for (am = 1; am < Col - 1; am++) {
            if (Board[sh][am] == 1) {
                //#region 1-1+ DownLeft
                if (Board[sh + 1][am] == 1 && Board[sh + 2][am] == 1 && Board[sh + 2][am - 1] == 1 &&
                    Board[sh + 2][am - 2] == 1 && Board[sh + 2][am - 3] == 1 && Board[sh + 2][am - 2] == 2) {
                    Board[sh + 1][am + 1] = 10;
                    Board[sh + 2][am + 1] = 10;
                    Board[sh + 3][am + 1] = 10;
                }
                //#endregion
                //#region 1-1+ DownRIght
                if (Board[sh + 1][am] == 1 && Board[sh + 2][am] == 1 && Board[sh + 2][am + 1] == 1 && Board[sh + 2][am + 2] == 1 &&
                    Board[sh + 2][am + 3] == 1 && Board[sh + 3][am + 2] == 2) {
                    Board[sh + 1][am - 1] = 10;
                    Board[sh + 2][am - 1] = 10;
                    Board[sh + 3][am - 1] = 10;
                }
                //#endregion
                //#region 1-2+ DownLeft
                if (Board[sh + 1][am] == 2 && Board[sh + 2][am] == 4 && Board[sh + 2][am - 1] == 1 &&
                    Board[sh + 2][am - 2] == 1 && Board[sh + 2][am - 3] == 1 && Board[sh + 3][am - 2] == 2) {
                    Board[sh + 1][am + 1] = 12;
                    Board[sh + 2][am + 1] = 12;
                    Board[sh + 3][am + 1] = 12;
                }
                //#endregion
                //#region 1-2+ DownRIght
                if (Board[sh + 1][am] == 2 && Board[sh + 2][am] == 4 && Board[sh + 2][am + 1] == 1 &&
                    Board[sh + 2][am + 2] == 1 && Board[sh + 2][am + 3] == 1 && Board[sh + 3][am + 2] == 2) {
                    Board[sh + 1][am - 1] = 12;
                    Board[sh + 2][am - 1] = 12;
                    Board[sh + 3][am - 1] = 12;
                }
                //#endregion
                //#region H2 DownLeft
                if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 1 && Board[sh][am + 3] == 1 &&
                    Board[sh][am + 4] == 1 && Board[sh + 1][am + 2] == 1 && Board[sh + 2][am + 1] == 2 && Board[sh + 2][am + 2] == 1 &&
                    Board[sh + 2][am + 3] == 3) {
                    Board[sh + 3][am + 1] = 10;
                    Board[sh + 3][am + 2] = 10;
                    Board[sh + 3][am + 3] = 10;
                }
                //#endregion
                //#region H2 DownRight
                if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 1 && Board[sh][am + 3] == 1 &&
                    Board[sh][am + 4] == 1 && Board[sh + 1][am + 2] == 1 && Board[sh + 2][am + 1] == 3 && Board[sh + 2][am + 2] == 1 &&
                    Board[sh + 2][am + 3] == 2) {
                    Board[sh + 3][am + 1] = 10;
                    Board[sh + 3][am + 2] = 10;
                    Board[sh + 3][am + 3] = 10;
                }
                //#endregion
                //#region H1 UpLeftRight
                if (Board[sh + 1][am - 2] == 1 && Board[sh + 1][am - 1] == 1 && Board[sh + 1][am] == 1 &&
                    Board[sh + 1][am + 1] == 1 && Board[sh + 1][am + 2] == 1) {
                    Board[sh - 1][am - 1] = 10;
                    Board[sh - 1][am] = 10;
                    Board[sh - 1][am + 1] = 10;
                }
                //#endregion
                //#region H1 DownLeftRight
                if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 1 && Board[sh][am + 3] == 1 &&
                    Board[sh][am + 4] == 1 && Board[sh + 1][am + 2] == 1) {
                    Board[sh + 2][am + 1] = 10;
                    Board[sh + 2][am + 2] = 10;
                    Board[sh + 2][am + 3] = 10;
                }
                //#endregion
                //#region 1-2C+ DownLeft
                if (Board[sh + 1][am] == 2 && Board[sh + 2][am] == 4 && Board[sh + 2][am - 1] == 1 &&
                    Board[sh + 2][am - 2] == 1 && Board[sh + 2][am - 3] == 3) {
                    Board[sh + 1][am + 1] = 12;
                    Board[sh + 2][am + 1] = 12;
                    Board[sh + 3][am + 1] = 12;
                }
                //#endregion
                //#region 1-2C+ DownRight
                if (Board[sh + 1][am] == 2 && Board[sh + 2][am] == 4 && Board[sh + 2][am + 1] == 1 &&
                    Board[sh + 2][am + 2] == 1 && Board[sh + 2][am + 3] == 3) {
                    Board[sh + 1][am - 1] = 12;
                    Board[sh + 2][am - 1] = 12;
                    Board[sh + 3][am - 1] = 12;
                }
                //#endregion


            } else {
                if (Board[sh][am] == 2) {
                //#region 1-1+ UpLeft
                    if (Board[sh + 1][am - 1] == 1 && Board[sh + 1][am] == 1 && Board[sh + 1][am + 1] == 1 && Board[sh + 1][am + 2] == 1 &&
                        Board[sh + 1][am + 2] == 1 && Board[sh + 2][am + 2] == 1) {
                        Board[sh][am + 3] = 10;
                        Board[sh + 1][am + 3] = 10;
                        Board[sh + 2][am + 3] = 10;
                        am += 3;
                    }
                //#endregion               
                //#region 1-1+ UpRight
                if (Board[sh + 1][am - 2] == 1 && Board[sh + 1][am - 1] == 1 && Board[sh + 1][am] == 1 && Board[sh + 1][am + 1] == 1 &&
                    Board[sh + 2][am - 2] == 1 && Board[sh + 3][am - 2] == 1) {
                    Board[sh][am - 3] = 10;
                    Board[sh + 1][am - 3] = 10;
                    Board[sh + 2][am - 3] = 10;
                }
                //#endregion
                //#region 1-2+ UpLeft
                    if (Board[sh + 1][am - 1] == 1 && Board[sh + 1][am] == 1 && Board[sh + 1][am + 1] == 1 &&
                        Board[sh + 1][am + 2] == 4 && Board[sh + 2][am + 2] == 2 && Board[sh + 3][am + 2] == 1) {
                        Board[sh][am + 3] = 12;
                        Board[sh + 1][am + 3] = 12;
                        Board[sh + 2][am + 3] = 12;
                    }
                //#endregion
                //#region 1-2+ UpRight
                if (Board[sh + 1][am - 2] == 4 && Board[sh + 1][am - 1] == 1 && Board[sh + 1][am] == 1 &&
                    Board[sh + 1][am + 1] == 1 && Board[sh + 2][am - 2] == 2 && Board[sh + 3][am - 2] == 1) {
                    Board[sh][am - 3] = 12;
                    Board[sh + 1][am - 3] = 12;
                    Board[sh + 2][am - 3] = 12;
                    }
                //#endregion
                //#region 1-3-1 corner UpLeft
                if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 1 && Board[sh][am + 3] == 3 &&
                    Board[sh + 1][am + 3] == 1 && Board[sh + 2][am + 3] == 1 && Board[sh + 3][am + 3] == 2) {
                    Board[sh - 1][am + 1] = 10;
                    Board[sh - 1][am + 4] = 12;
                    Board[sh + 2][am + 4] = 10;
                    }
                //#endregion
                //#region 1-3-1 corner DownLeft
                if (Board[sh + 1][am] == 1 && Board[sh + 2][am] == 1 && Board[sh + 3][am - 3] == 2 &&
                    Board[sh + 3][am - 2] == 1 && Board[sh + 3][am - 1] == 1 && Board[sh + 3][am] == 3) {
                    Board[sh + 1][am + 1] = 10;
                    Board[sh + 4][am - 2] = 10;
                    Board[sh + 4][am + 1] = 12;
                    }
                //#endregion
                //#region 1-3-1 corner DownRight
                if (Board[sh + 1][am] == 1 && Board[sh + 2][am] == 1 && Board[sh + 3][am] == 3 &&
                    Board[sh + 3][am + 1] == 1 && Board[sh + 3][am + 2] == 1 && Board[sh + 3][am + 3] == 2) {
                    Board[sh + 1][am - 1] = 10;
                    Board[sh + 4][am - 1] = 12;
                    Board[sh + 4][am + 2] = 10;
                    }
                //#endregion
                //#region 2-2-2 corner DownLeft
               if (Board[sh][am + 1] == 2 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 2 &&
                   Board[sh + 1][am + 3] == 2 && Board[sh + 2][am + 3] == 2 && Board[sh + 3][am + 3] == 2) {
                    Board[sh - 1][am + 1] = 12;
                    Board[sh - 1][am + 4] = 10;
                    Board[sh + 2][am + 4] = 12;
                    am += 3;
                }
                //#endregion
                //#region 2-2-2 corner UpLeft
                if (Board[sh + 1][am] == 2 && Board[sh + 2][am] == 2 && Board[sh + 3][am] == 2 &&
                    Board[sh + 3][am - 1] == 2 && Board[sh + 3][am - 2] == 2 && Board[sh + 3][am - 3] == 2) {
                    Board[sh + 1][am + 1] = 12;
                    Board[sh + 4][am + 1] = 10;
                    Board[sh + 4][am - 2] = 12;
                    }
                //#endregion
                //#region 2-2-2 corner DownRight
                if (Board[sh][am + 1] == 2 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 2 &&
                    Board[sh + 1][am] == 2 && Board[sh + 2][am] == 2 && Board[sh + 3][am] == 2) {
                    Board[sh - 1][am - 1] = 10;
                    Board[sh - 1][am + 2] = 12;
                    Board[sh + 2][am - 1] = 12;
                    }
                //#endregion
                //#region 2-2-2 corner UpRight
                if (Board[sh + 1][am] == 2 && Board[sh + 2][am] == 2 && Board[sh + 3][am] == 2 &&
                    Board[sh + 3][am + 1] == 2 && Board[sh + 3][am + 2] == 2 && Board[sh + 3][am + 3] == 2) {
                    Board[sh + 1][am - 1] = 12;
                    Board[sh + 4][am - 1] = 10;
                    Board[sh + 4][am + 2] = 12;
                    }
                //#endregion
                //#region 1-2C DownLeft
                if (Board[sh][am + 3] == 3 && Board[sh + 1][am] == 2 && Board[sh + 1][am + 3] == 2 &&
                    Board[sh + 2][am] == 3 && Board[sh + 2][am + 1] == 1 && Board[sh + 2][am + 2] == 2 && Board[sh + 2][am + 3] == 3) {
                    Board[sh + 3][am + 3] = 12;
                    }
                //#endregion
                //#region H2 UpLeft
                if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 3 && Board[sh + 1][am + 1] == 1 &&
                    Board[sh + 2][am - 1] == 1 && Board[sh + 2][am] == 1 && Board[sh + 2][am + 1] == 1 && Board[sh + 2][am + 2] == 1 &&
                    Board[sh + 2][am + 3] == 1) {
                    Board[sh - 1][am] = 10;
                    Board[sh - 1][am + 1] = 10;
                    Board[sh - 1][am + 2] = 10;
                    }
                //#endregion



                } else {
                    if (Board[sh][am] == 3) {
                      //#region 1-3-1 corner UpRight
                       if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 1 && Board[sh][am + 3] == 2 &&
                           Board[sh + 1][am] == 1 && Board[sh + 2][am] == 1 && Board[sh + 3][am] == 2) {
                           Board[sh - 1][am - 1] = 12;
                           Board[sh - 1][am + 1] = 10;
                           Board[sh + 2][am - 1] = 10;
                        }
                      //#endregion
                      //#region 1-2C UpLeft
                        if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 3 &&
                            Board[sh + 1][am] == 2 && Board[sh + 1][am + 3] == 2 && Board[sh + 2][am] == 2 && Board[sh + 2][am + 3] == 3) {
                            Board[sh - 1][am + 3] = 12;
                        }
                      //#endregion
                      //#region 1-2C DownRight
                        if (Board[sh][am + 3] == 2 && Board[sh + 1][am] == 2 && Board[sh + 1][am + 3] == 2 &&
                            Board[sh + 2][am] == 3 && Board[sh + 2][am + 1] == 2 && Board[sh + 2][am + 2] == 1 && Board[sh + 2][am + 3] == 3) {
                            Board[sh + 3][am] = 12;
                        }
                      //#endregion
                      //#region 1-2C UpRight
                        if (Board[sh][am + 1] == 2 && Board[sh][am + 2] == 1 && Board[sh][am + 3] == 3 &&
                            Board[sh + 1][am] == 2 && Board[sh + 1][am + 3] == 2 && Board[sh + 2][am] == 3 && Board[sh + 2][am + 3] == 2) {
                            Board[sh - 1][am] = 12;
                        }
                      //#endregion
                      //#region 1-2C+ UpLeft
                        if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 1 && Board[sh][am + 3] == 4 &&
                            Board[sh + 1][am + 3] == 2 && Board[sh + 2][am + 3] == 1) {
                            Board[sh - 1][am + 4] = 12;
                            Board[sh][am + 4] = 12;
                            Board[sh + 1][am + 4] = 12;
                        }
                      //#endregion
                      //#region 1-2-1 UpLeft
                        if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 1 &&
                            Board[sh][am + 4] == 4 &&
                            (-1 < Board[sh + 1][am + 1] && Board[sh + 1][am + 1] < 5) && (-1 < Board[sh + 1][am + 3] && Board[sh + 1][am + 3] < 5)) {
                            Board[sh - 1][am + 3] = 12;
                            Board[sh - 1][am + 1] = 12;
                        }
                      //#endregion
                      //#region 1-2-1 DownLeft
                        if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 1 &&
                            Board[sh][am + 4] == 4 &&
                            (-1 < Board[sh - 1][am + 1] && Board[sh - 1][am + 1] < 5) && (-1 < Board[sh - 1][am + 3] && Board[sh - 1][am + 3] < 5)) {
                            Board[sh + 1][am + 3] = 12;
                            Board[sh + 1][am + 1] = 12;
                        }
                      //#endregion
                      //#region 1-2-1 LeftExtra
                        if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 1 &&
                            Board[sh][am + 4] == 4 && Board[sh + 1][am + 1] == -1 && Board[sh + 1][am + 3] == -1 &&
                            Board[sh - 1][am + 1] == -1 && Board[sh - 1][am + 3] == -1) {
                            Board[sh + 1][am + 1] = 11;
                            Board[sh + 1][am + 3] = 11;
                            Board[sh - 1][am + 1] = 11;
                            Board[sh - 1][am + 3] = 11;
                            Board[sh - 1][am] = 10;
                            Board[sh - 1][am + 2] = 10;
                            Board[sh - 1][am + 4] = 10;
                            Board[sh + 1][am] = 10;
                            Board[sh + 1][am + 2] = 10;
                            Board[sh + 1][am + 4] = 10;
                        }
                     //#endregion
                      //#region 1-2-2-1 UpLeftRight
                        if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 2 &&
                            Board[sh][am + 4] == 1 && Board[sh][am + 5] == 3 &&
                            (-1 < Board[sh + 1][am + 2] && Board[sh + 1][am + 2] < 5) && (-1 < Board[sh + 1][am + 3] && Board[sh + 1][am + 3] < 5)) {
                            Board[sh - 1][am + 2] = 12;
                            Board[sh - 1][am + 3] = 12;
                        }
                      //#endregion
                      //#region 1-2-2-1 DownLeftRight
                        if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 2 &&
                            Board[sh][am + 4] == 1 && Board[sh][am + 5] == 3 &&
                            (-1 < Board[sh - 1][am + 2] && Board[sh - 1][am + 2] < 5) && (-1 < Board[sh - 1][am + 3] && Board[sh - 1][am + 3] < 5)) {
                            Board[sh + 1][am + 2] = 12;
                            Board[sh + 1][am + 3] = 12;
                        }
                      //#endregion
                      //#region 1-2-2-1 LeftRightExtra
                        if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 2 &&
                            Board[sh][am + 4] == 1 && Board[sh][am + 5] == 3 &&
                            Board[sh - 1][am + 2] == -1 && Board[sh - 1][am + 3] == -1 && Board[sh + 1][am + 2] == -1 && Board[sh + 1][am + 3] == -1) {
                            Board[sh - 1][am] = 10;
                            Board[sh - 1][am + 1] = 10;
                            Board[sh - 1][am + 4] = 10;
                            Board[sh - 1][am + 5] = 10;
                            Board[sh + 1][am] = 10;
                            Board[sh + 1][am + 1] = 10;
                            Board[sh + 1][am + 4] = 10;
                            Board[sh + 1][am + 5] = 10;
                            Board[sh - 1][am + 2] = 11;
                            Board[sh - 1][am + 3] = 11;
                            Board[sh + 1][am + 2] = 11;
                            Board[sh + 1][am + 3] = 11;

                        }
                      //#endregion
                      //#region H2 UpRight
                        if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 2 && Board[sh + 1][am + 1] == 1 &&
                            Board[sh + 2][am - 1] == 1 && Board[sh + 2][am] == 1 && Board[sh + 2][am + 1] == 1 && Board[sh + 2][am + 2] == 1 &&
                            Board[sh + 2][am + 3] == 1) {
                            Board[sh - 1][am] = 10;
                            Board[sh - 1][am + 1] = 10;
                            Board[sh - 1][am + 2] = 10;
                        }
                    //#endregion

                    } else {
                        if (Board[sh][am] == 4) {
                            //#region 1-2C+ UpRight
                            if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 1 && Board[sh][am + 3] == 3 &&
                                Board[sh + 1][am] == 2 && Board[sh + 2][am] == 1) {
                                Board[sh - 1][am - 1] = 12;
                                Board[sh][am - 1] = 12;
                                Board[sh + 1][am - 1] = 12;
                            }
                            //#endregion
                            //#region 1-2-1 UpRight
                            if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 1 &&
                                Board[sh][am + 4] == 3 &&
                                (-1 < Board[sh + 1][am + 1] && Board[sh + 1][am + 1] < 5) && (-1 < Board[sh + 1][am + 3] && Board[sh + 1][am + 3] < 5)) {
                                Board[sh - 1][am + 3] = 12;
                                Board[sh - 1][am + 1] = 12;
                            }
                           //#endregion
                            //#region 1-2-1 DownRight
                            if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 1 &&
                                Board[sh][am + 4] == 3 &&
                                (-1 < Board[sh - 1][am + 1] && Board[sh - 1][am + 1] < 5) && (-1 < Board[sh - 1][am + 3] && Board[sh - 1][am + 3] < 5)) {
                                Board[sh + 1][am + 3] = 12;
                                Board[sh + 1][am + 1] = 12;
                            }
                           //#endregion
                            //#region 1-2-1 RightExtra
                            if (Board[sh][am + 1] == 1 && Board[sh][am + 2] == 2 && Board[sh][am + 3] == 1 &&
                                Board[sh][am + 4] == 3 && Board[sh + 1][am + 1] == -1 && Board[sh + 1][am + 3] == -1 &&
                                Board[sh - 1][am + 1] == -1 && Board[sh - 1][am + 3] == -1) {
                                Board[sh + 1][am + 1] = 11;
                                Board[sh + 1][am + 3] = 11;
                                Board[sh - 1][am + 1] = 11;
                                Board[sh - 1][am + 3] = 11;
                                Board[sh - 1][am] = 10;
                                Board[sh - 1][am + 2] = 10;
                                Board[sh - 1][am + 4] = 10;
                                Board[sh + 1][am] = 10;
                                Board[sh + 1][am + 2] = 10;
                                Board[sh + 1][am + 4] = 10;
                            }
                           //#endregion


                        } else {
                            if (Board[sh][am] == 5) {
                            } else {
                                if (Board[sh][am] == 6) {
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    PaintGreen();
    PaintRed();
    PaintPink();
    if (Findingmines == false) {
        CheckRandom();
    }

}

function CheckRandom() { //Logical Check for inserting a certian cell as a mine, changes a premade "Ghost" array to current gameboard
    // array, then, inserets a cell as a mine, and checks if board makes sense. if it does, it paints the cell in pink, this is made
    // to make sure we have a higher chance of hitting a mine, instead of absolute random.
    CheckBoard = Board;
    for (sh2 = 0; sh2 < Row; sh2++) {
        for (am2 = 0; am2 < Col; am2++) {
            if (CheckBoard[sh2][am2] == -1) {
                CheckBoard[sh2][am2] = 9;
                RandomCheckUpLeftCorner();
                RandomCheckDownRightCorner();
                RandomCheckUpRightCorner();
                RandomCheckDownRightCorner();
                RandomCheckTopRow();
                RandomCheckBottomRow();
                RandomCheckLeftCol();
                RandomCheckRightCol();
                RandomCheck2();

                if (FindingMinesRandom == true) {
                    CheckBoard[sh2][am2] = -1;
                    document.getElementById(sh2 * Col + am2).style.backgroundColor = "#c03fab";
                    break;
                } else {
                    CheckBoard[sh2][am2] = -1;
                }
            }
        }
        if (FindingMinesRandom == true) {
            break;
        }
    }
    if (FindingMinesRandom == false) {
        random();
    }
    FindingMinesRandom = false;
}

function RandomCheck2()  { //See @CheckRandom() for notes.
    for (sh = 1; sh < Row - 1; sh++) {
        for (am = 1; am < Col - 1; am++) {
            if (CheckBoard[sh][am] != 0 || CheckBoard[sh][am] != -1 || CheckBoard[sh][am] != 9) {
                if (-1 < CheckBoard[sh - 1][am - 1] && CheckBoard[sh - 1][am - 1] < 9) {
                    Notmines++;
                } else {
                    if (CheckBoard[sh - 1][am - 1] == 9) {
                        mines++;
                    }
                }
                if (-1 < CheckBoard[sh - 1][am] && CheckBoard[sh - 1][am] < 9) {
                    Notmines++;
                } else {
                    if (CheckBoard[sh - 1][am] == 9) {
                        mines++;
                    }
                }
                if (-1 < CheckBoard[sh - 1][am + 1] && CheckBoard[sh - 1][am + 1] < 9) {
                    Notmines++;
                } else {
                    if (CheckBoard[sh - 1][am + 1] == 9) {
                        mines++;
                    }
                }
                if (-1 < CheckBoard[sh][am + 1] && CheckBoard[sh][am + 1] < 9) {
                    Notmines++;
                } else {
                    if (CheckBoard[sh][am + 1] == 9) {
                        mines++;
                    }
                }
                if (-1 < CheckBoard[sh + 1][am + 1] && CheckBoard[sh + 1][am + 1] < 9) {
                    Notmines++;
                } else {
                    if (CheckBoard[sh + 1][am + 1] == 9) {
                        mines++;
                    }
                }
                if (-1 < CheckBoard[sh + 1][am] && CheckBoard[sh + 1][am] < 9) {
                    Notmines++;
                } else {
                    if (CheckBoard[sh + 1][am] == 9) {
                        mines++;
                    }
                }
                if (-1 < CheckBoard[sh + 1][am - 1] && CheckBoard[sh + 1][am - 1] < 9) {
                    Notmines++;
                } else {
                    if (CheckBoard[sh + 1][am - 1] == 9) {
                        mines++;
                    }
                }
                if (-1 < CheckBoard[sh][am - 1] && CheckBoard[sh][am - 1] < 9) {
                    Notmines++;
                } else {
                    if (CheckBoard[sh][am - 1] == 9) {
                        mines++;
                    }
                }
                if (mines == CheckBoard[sh][am] && CheckBoard[sh][am] != 0) {
                    if (-1 == CheckBoard[sh - 1][am - 1]) {
                        document.getElementById((sh - 1) * Col + am - 1).style.backgroundColor = "lightgreen";
                        FindingMinesRandom = true;
                    }
                    if (-1 == CheckBoard[sh - 1][am]) {
                        document.getElementById((sh - 1) * Col + am).style.backgroundColor = "lightgreen";
                        FindingMinesRandom = true;
                    }
                    if (-1 == CheckBoard[sh - 1][am + 1]) {
                        document.getElementById((sh - 1) * Col + am + 1).style.backgroundColor = "lightgreen";
                        FindingMinesRandom = true;
                    }
                    if (-1 == CheckBoard[sh][am + 1]) {
                        document.getElementById(sh * Col + am + 1).style.backgroundColor = "lightgreen";
                        FindingMinesRandom = true;
                    }
                    if (-1 == CheckBoard[sh + 1][am + 1]) {
                        document.getElementById((sh + 1) * Col + am + 1).style.backgroundColor = "lightgreen";
                        FindingMinesRandom = true;
                    }
                    if (-1 == CheckBoard[sh + 1][am]) {
                        document.getElementById((sh + 1) * Col + am).style.backgroundColor = "lightgreen";
                        FindingMinesRandom = true;
                    }
                    if (-1 == CheckBoard[sh + 1][am - 1]) {
                        document.getElementById((sh + 1) * Col + am - 1).style.backgroundColor = "lightgreen";
                        FindingMinesRandom = true;
                    }
                    if (-1 == CheckBoard[sh][am - 1]) {
                        document.getElementById((sh) * Col + am - 1).style.backgroundColor = "lightgreen";
                        FindingMinesRandom = true;
                    }
                }
            }           
            Notmines = 0;
            mines = 0;
        }
    }
}

function RandomCheckUpLeftCorner() {//See @CheckRandom() for notes.
    if (-1 < CheckBoard[0][1] && CheckBoard[0][1] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[0][1] == 9) {
            mines++;
        }
    }
    if (-1 < CheckBoard[1][1] && CheckBoard[1][1] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[1][1] == 9) {
            mines++;
        }
    }
    if (-1 < CheckBoard[1][0] && CheckBoard[1][0] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[1][0] == 9) {
            mines++;
        }
    }
    if (mines == CheckBoard[0][0] && CheckBoard[0][0] != 0) {
        if (-1 == CheckBoard[0][1]) {
            document.getElementById(1).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
        if (-1 == CheckBoard[1][1]) {
            document.getElementById(Col + 1).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
        if (-1 == CheckBoard[1][0]) {
            document.getElementById(Col).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
    }
    Notmines = 0;
    mines = 0;
}

function RandomCheckDownLeftCorner() {//See @CheckRandom() for notes.
    if (-1 < CheckBoard[Row - 1][1] && CheckBoard[Row - 1][1] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[Row - 1][1] == 9) {
            mines++;
        }
    }
    if (-1 < CheckBoard[Row - 2][1] && CheckBoard[Row - 2][1] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[Row - 2][1] == 9) {
            mines++;
        }
    }
    if (-1 < CheckBoard[Row - 2][0] && CheckBoard[Row - 2][0] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[Row - 2][0] == 9) {
            mines++;
        }
    }
    if (mines == CheckBoard[Row - 1][0] && CheckBoard[Row - 1][0] != 0) {
        if (-1 == CheckBoard[Row - 1][1]) {
            document.getElementById((Row - 1) * Col + 1).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
        if (-1 == CheckBoard[Row - 2][1]) {
            document.getElementById((Row - 2) * Col + 1).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
        if (-1 == CheckBoard[Row - 2][0]) {
            document.getElementById((Row - 2) * Col).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
    }
    Notmines = 0;
    mines = 0;
}

function RandomCheckUpRightCorner() {//See @CheckRandom() for notes.
    if (-1 < CheckBoard[0][Col - 2] && CheckBoard[0][Col - 2] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[0][Col - 2] == 9) {
            mines++;
        }
    }
    if (-1 < CheckBoard[1][Col - 2] && CheckBoard[1][Col - 2] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[1][Col - 2] == 9) {
            mines++;
        }
    }
    if (-1 < CheckBoard[1][Col - 1] && CheckBoard[1][Col - 1] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[1][Col - 1] == 9) {
            mines++;
        }
    }
    if (mines == CheckBoard[0][Col - 1] && CheckBoard[0][Col - 1] != 0 ) {
        if (-1 == CheckBoard[0][Col - 2]) {
            document.getElementById(Col - 2).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
        if (-1 == CheckBoard[1][Col - 2]) {
            document.getElementById(Col + Col - 2).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
        if (-1 == CheckBoard[1][Col - 1]) {
            document.getElementById(Col + Col - 1).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
    }
    Notmines = 0;
    mines = 0;
}

function RandomCheckDownRightCorner() {//See @CheckRandom() for notes.
    if (-1 < CheckBoard[Row - 1][Col - 2] && CheckBoard[Row - 1][Col - 2] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[Row - 1][Col - 2] == 9) {
            mines++;
        }
    }
    if (-1 < CheckBoard[Row - 2][Col - 2] && CheckBoard[Row - 2][Col - 2] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[Row - 2][Col - 2] == 9) {
            mines++;
        }
    }
    if (-1 < CheckBoard[Row - 2][Col - 1] && CheckBoard[Row - 2][Col - 1] < 9) {
        Notmines++;
    } else {
        if (CheckBoard[Row - 2][Col - 1] == 9) {
            mines++;
        }
    }
    if (mines == CheckBoard[Row - 1][Col - 1] && CheckBoard[Row - 1][Col - 1] != 0 ) {
        if (-1 == CheckBoard[Row - 1][Col - 2]) {
            document.getElementById((Row - 1) * Col + Col- 2).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
        if (-1 == CheckBoard[Row - 2][Col - 2]) {
            document.getElementById((Row - 2) * Col + Col- 2).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
        if (-1 == CheckBoard[Row - 2][Col - 1]) {
            document.getElementById((Row - 2) * Col + Col - 1).style.backgroundColor = "lightgreen";
            FindingMinesRandom = true;
        }
    }
    Notmines = 0;
    mines = 0;
}

function RandomCheckTopRow() {//See @CheckRandom() for notes.
    for (am = 1; am < Col - 1; am++) {
        if (CheckBoard[0][am] != 0 || CheckBoard[0][am] != -1 || CheckBoard[0][am] != 9) {
            if (-1 < CheckBoard[0][am - 1] && CheckBoard[0][am - 1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[0][am - 1] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[1][am - 1] && CheckBoard[1][am - 1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[1][am - 1] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[1][am] && CheckBoard[1][am] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[1][am] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[1][am + 1] && CheckBoard[1][am + 1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[1][am + 1] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[0][am + 1] && CheckBoard[0][am + 1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[0][am + 1] == 9) {
                    mines++;
                }
            }
            if (mines == CheckBoard[0][am] && CheckBoard[0][am] != 0) {
                if (-1 == CheckBoard[0][am - 1]) {
                    document.getElementById(am - 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[1][am - 1]) {
                    document.getElementById(Col + am - 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[1][am]) {
                    document.getElementById(Col + am).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[1][am + 1]) {
                    document.getElementById(Col + am + 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[0][am + 1]) {
                    document.getElementById(am + 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
            }
        }
        Notmines = 0;
        mines = 0;
    }
}
    
function RandomCheckBottomRow() {//See @CheckRandom() for notes.
    for (am = 1; am < Col - 1; am++) {
        if (CheckBoard[Row - 1][am] != 0 || CheckBoard[Row - 1][am] != -1 || CheckBoard[Row - 1][am] != 9) {
            if (-1 < CheckBoard[Row - 1][am - 1] && CheckBoard[Row - 1][am - 1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[Row - 1][am - 1] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[Row - 2][am - 1] && CheckBoard[Row - 2][am - 1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[Row - 2][am - 1] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[Row - 2][am] && CheckBoard[Row - 2][am] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[Row - 2][am] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[Row - 2][am + 1] && CheckBoard[Row - 2][am + 1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[Row - 2][am + 1] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[Row - 1][am + 1] && CheckBoard[Row - 1][am + 1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[Row - 1][am + 1] == 9) {
                    mines++;
                }
            }
            if (mines == CheckBoard[Row - 1][am] && CheckBoard[Row - 1][am] != 0) {
                if (-1 == CheckBoard[Row - 1][am - 1]) {
                    document.getElementById((Row - 1) * Col + am - 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[Row - 2][am - 1]) {
                    document.getElementById((Row - 2) * Col + am - 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[Row - 2][am]) {
                    document.getElementById((Row - 2) * Col + am).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[Row - 2][am + 1]) {
                    document.getElementById((Row - 2) * Col + am + 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[Row - 1][am + 1]) {
                    document.getElementById((Row - 1) * Col + am + 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
            }
        }
        Notmines = 0;
        mines = 0;
    }
}

function RandomCheckLeftCol() {//See @CheckRandom() for notes.
    for (sh = 1; sh < Row - 1; sh++) {
        if (CheckBoard[sh][0] != 0 || CheckBoard[sh][0] != -1 || CheckBoard[sh][0] != 9) {
            if (-1 < CheckBoard[sh - 1][0] && CheckBoard[sh - 1][0] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[sh - 1][0] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[sh - 1][1] && CheckBoard[sh - 1][1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[sh - 1][1] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[sh][1] && CheckBoard[sh][1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[sh][1] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[sh + 1][1] && CheckBoard[sh + 1][1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[sh + 1][1] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[sh + 1][0] && CheckBoard[sh + 1][0] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[sh + 1][0] == 9) {
                    mines++;
                }
            }
            if (mines == CheckBoard[sh][0] && CheckBoard[sh][0] != 0) {
                if (-1 == CheckBoard[sh - 1][0]) {
                    document.getElementById((sh - 1) * Col).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[sh - 1][1]) {
                    document.getElementById((sh - 1) * Col + 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[sh][1]) {
                    document.getElementById((sh) * Col + 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[sh + 1][1]) {
                    document.getElementById((sh + 1) * Col + 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[sh + 1][0]) {
                    document.getElementById((sh + 1) * Col).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
            }
        }
        Notmines = 0;
        mines = 0;
    }
}

function RandomCheckRightCol() {//See @CheckRandom() for notes.
    for (sh = 1; sh < Row - 1; sh++) {
        if (CheckBoard[sh][Col - 1] != 0 || CheckBoard[sh][Col - 1] != -1 || CheckBoard[sh][Col - 1] != 9) {
            if (-1 < CheckBoard[sh - 1][Col - 1] && CheckBoard[sh - 1][Col - 1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[sh - 1][Col - 1] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[sh - 1][Col - 2] && CheckBoard[sh - 1][Col - 2] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[sh - 1][Col - 2] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[sh][Col - 2] && CheckBoard[sh][Col - 2] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[sh][Col - 2] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[sh + 1][Col - 2] && CheckBoard[sh + 1][Col - 2] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[sh + 1][Col - 2] == 9) {
                    mines++;
                }
            }
            if (-1 < CheckBoard[sh + 1][Col - 1] && CheckBoard[sh + 1][Col - 1] < 9) {
                Notmines++;
            } else {
                if (CheckBoard[sh + 1][Col - 1] == 9) {
                    mines++;
                }
            }
            if (mines == CheckBoard[sh][Col - 1] && CheckBoard[sh][Col - 1] != 0) {
                if (-1 == CheckBoard[sh - 1][Col - 1]) {
                    document.getElementById((sh - 1) * Col + Col - 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[sh - 1][Col - 2]) {
                    document.getElementById((sh - 1) * Col + Col - 2).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[sh][Col - 2]) {
                    document.getElementById((sh) * Col + Col - 2).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[sh + 1][Col - 2]) {
                    document.getElementById((sh + 1) * Col + Col - 2).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
                if (-1 == CheckBoard[sh + 1][Col - 1]) {
                    document.getElementById((sh + 1) * Col + Col - 1).style.backgroundColor = "lightgreen";
                    FindingMinesRandom = true;
                }
            }
        }
        Notmines = 0;
        mines = 0;
    }
}

function random() { // Absolute random. gathers all empty cells, randomly chooses an empty cell and marks it yellow.
    var RandomArray = [];
    for (var RaRow = 0; RaRow < Row; RaRow++) {
        for (var RaCol = 0; RaCol < Col; RaCol++) {
            if (Board[RaRow][RaCol] == -1) {
                var ClearId = (RaRow * Col + RaCol);
                RandomArray.push(ClearId);
            }
        }
    }
    var RandomNumber = RandomArray[Math.floor(Math.random() * RandomArray.length)];
    document.getElementById(RandomNumber).style.backgroundColor = "#f39f0c";

}

function PaintGreen() {
    for (sh1 = 0; sh1 < Row; sh1++) {
        for (am1 = 0; am1 < Col; am1++) {
            if (Board[sh1][am1] == 10) {
                Board[sh1][am1] = -1;
                document.getElementById(sh1 * Col + am1).style.backgroundColor = "Green";
                Findingmines = true;
            }
        }
    }
}

function PaintRed() {
    for (sh1 = 0; sh1 < Row; sh1++) {
        for (am1 = 0; am1 < Col; am1++) {
            if (Board[sh1][am1] == 12) {
                Board[sh1][am1] = 9;
                document.getElementById(sh1 * Col + am1).style.backgroundColor = "Red";
                Findingmines = true;
            }
        }
    }
}

function PaintPink() {
    for (sh1 = 0; sh1 < Row; sh1++) {
        for (am1 = 0; am1 < Col; am1++) {
            if (Board[sh1][am1] == 11) {
                Board[sh1][am1] = -1;
                document.getElementById(sh1 * Col + am1).style.backgroundColor = "#c03fab";
            }
        }
    }
}