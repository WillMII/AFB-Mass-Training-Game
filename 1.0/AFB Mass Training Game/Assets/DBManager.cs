using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

//DBManager contains all of the clues that have been clicked on/completed so far.

public static class DBManager
{
    public static string userEmail;
    public static int userID;
    public static int[] cluesClicked = new int[11];
    public static int[] multipartCluesCompleted = new int[2];
    public static int quizCompleted;
    public static string timeCompleted = "";

    public static float calculateProgress()
    {
        // Adds 1 to numberOfCluesClickedOrCompleted for each clue clicked on/completed
        int numberOfCluesClickedOrCompleted = 0;
        for (int i = 0; i < cluesClicked.Length; i++)
        {
            numberOfCluesClickedOrCompleted += cluesClicked[i];
        } // for

        for (int i = 0; i <  multipartCluesCompleted.Length; i++)
        {
            numberOfCluesClickedOrCompleted += multipartCluesCompleted[i];
        } // for

        
        float totalClues = 14.0F;
        if (quizCompleted == 1 ){
            return 100.0F;
        } else
        {
            return ((numberOfCluesClickedOrCompleted / totalClues) * 100);
        }
        

    }

    
}
