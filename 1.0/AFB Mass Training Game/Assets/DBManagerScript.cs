using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class DBManagerScript : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        if (this != null && gameObject.activeInHierarchy)
            StartCoroutine(loadInData());
        Debug.Log("DBManagerScript");
    }

    void Update()
    {
  
    }

    public void callLoadInData()
    {
        

        //UnityWebRequest request = UnityWebRequest.Get("Test");

        // Below is the test code used to test if the game will react a specific way or not.
        /*
        int[] testClueArray = new int[11];
        testClueArray[0] = 1;
        testClueArray[1] = 1;
        testClueArray[2] = 1;
        testClueArray[3] = 1;
        testClueArray[4] = 1;
        testClueArray[5] = 1;
        testClueArray[6] = 1;
        testClueArray[7] = 1;
        testClueArray[8] = 1;
        testClueArray[9] = 1;
        testClueArray[10] = 1;

        int[] testMultiPartClueArray = new int[2];
        testMultiPartClueArray[0] = 1;
        testMultiPartClueArray[1] = 1;

        for (int i = 0; i < testClueArray.Length; i++)
        {
            DBManager.cluesClicked[i] = testClueArray[i];
        }

        for (int i = 0; i < testMultiPartClueArray.Length; i++)
        {
            DBManager.multipartCluesCompleted[i] = testMultiPartClueArray[i];
        }

        DBManager.quizCompleted = 1;
        */
    }

    IEnumerator loadInData()
    {
        UnityWebRequest request = UnityWebRequest.Get("http://localhost:8000/api/user");
        request.SetRequestHeader("Content-Type", "application/json");
        yield return request.SendWebRequest();
        if (request.result == UnityWebRequest.Result.Success)
        {
            string json = request.downloadHandler.text;
            UserData user = JsonUtility.FromJson<UserData>(json);
            Debug.Log("Email: " + user.email);
            DBManager.userEmail = user.email;
        }


        WWWForm form = new WWWForm();
        form.AddField("email", DBManager.userEmail);
        UnityWebRequest www = UnityWebRequest.Post("http://localhost:8001/phpfiles/stinfoget.php", form);
        yield return www.SendWebRequest();
        if (www.downloadHandler.text[0] == '0')
        {
            Debug.Log("Email Read!");
            string[] response = www.downloadHandler.text.Split('\t');
            Debug.Log("User ID: " + response[1]);
            DBManager.userID = int.Parse(response[1]);
            int multipartClueNum = 0;
            Debug.Log("Response Length: " + response.Length);
            for (int i = 0; i < response.Length; i++)
            {
                Debug.Log(i + ": " + response[i]);
            }
            for (int i = 2; i < response.Length; i++)
            {
                Debug.Log("Column " + (i - 1) + ": " + response[i]);
                // If the index is one of the multipartclueCompletion
                if (i == 6 || i == 10)
                {
                    DBManager.multipartCluesCompleted[multipartClueNum] = int.Parse(response[i]);
                    multipartClueNum++;
                // If the index is on the quizCompletion
                } else if (i == (response.Length - 1))
                {
                    Debug.Log("response " + i + ": "+ response[i]);
                    DBManager.quizCompleted = int.Parse(response[i]);
                // If the index is one of the cluesClicked
                } else
                {
                    Debug.Log("Index: " + i);
                    DBManager.cluesClicked[i - multipartClueNum - 2] = int.Parse(response[i]);
                } // if
            }
            //Debug.Log(int.Parse(www.downloadHandler.text.Split('\t')[1]));

        } else
        {
            Debug.Log("Email Read error. Error #" + www.downloadHandler.text);
        }
        Debug.Log("DBManagerScript is being reached!");

    }
    public void callSaveData()
    {
        StartCoroutine(saveData());
    }

    IEnumerator saveData()
    {
        WWWForm form = new WWWForm();
        form.AddField("email", DBManager.userEmail);
        form.AddField("clue1clicked", DBManager.cluesClicked[0]);
        form.AddField("clue2clicked", DBManager.cluesClicked[1]);
        form.AddField("clue3clicked", DBManager.cluesClicked[2]);
        form.AddField("clue4clicked", DBManager.cluesClicked[3]);
        form.AddField("clue4completed", DBManager.multipartCluesCompleted[0]);
        form.AddField("clue5clicked", DBManager.cluesClicked[4]);
        form.AddField("clue6clicked", DBManager.cluesClicked[5]);
        form.AddField("clue7clicked", DBManager.cluesClicked[6]);
        form.AddField("clue8clicked", DBManager.cluesClicked[7]);
        form.AddField("clue8completed", DBManager.multipartCluesCompleted[1]);
        form.AddField("clue9clicked", DBManager.cluesClicked[8]);
        form.AddField("clue10clicked", DBManager.cluesClicked[9]);
        form.AddField("clue11clicked", DBManager.cluesClicked[10]);
        form.AddField("quizcompleted", DBManager.quizCompleted);
        //form.AddField("quizCompleted", DBManager.quizCompleted);

        UnityWebRequest www = UnityWebRequest.Post("http://localhost:8001/phpfiles/stinfoset.php", form);
        yield return www.SendWebRequest();
        if (www.downloadHandler.text[0] == '0')
        {
            Debug.Log("Game Saved!");
        }
        else
        {
            Debug.Log("Gave Save error. Error #" + www.downloadHandler.text);
        }
        // Sends data to game_progress database
        WWWForm progressForm = new WWWForm();
        progressForm.AddField("user_id", DBManager.userID);
        progressForm.AddField("module_id", 1);
        progressForm.AddField("progress", DBManager.calculateProgress().ToString());
        progressForm.AddField("date_complete", DBManager.timeCompleted);
        progressForm.AddField("stage", 1);

        UnityWebRequest progressWWW = UnityWebRequest.Post("http://localhost:8001/phpfiles/stinfoprogress.php", progressForm);
        yield return progressWWW.SendWebRequest();
        if (progressWWW.downloadHandler.text[0] == '0')
        {
            Debug.Log("Game added to game_progress!");
        }
        else
        {
            Debug.Log("Gave Save error. Error #" + progressWWW.downloadHandler.text);
        }

        Debug.Log("DBManagerScript is being reached!");

    }
}
