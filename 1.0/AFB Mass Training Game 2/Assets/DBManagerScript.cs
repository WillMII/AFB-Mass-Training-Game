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
        //callLoadInData();
    }

    public void callLoadInData()
    {


        //UnityWebRequest request = UnityWebRequest.Get("Test");

        // Below is the test code used to test if the game will react a specific way or not.
        /*
        int[] testClueArray = new int[18];
        testClueArray[0] = 1;
        testClueArray[1] = 1;
        testClueArray[2] = 1;
        testClueArray[3] = 1;
        testClueArray[4] = 1;
        testClueArray[5] = 1;
        testClueArray[6] = 1;
        testClueArray[7] = 0;
        testClueArray[8] = 0;
        testClueArray[9] = 0;
        testClueArray[10] = 0;
        testClueArray[11] = 0;
        testClueArray[12] = 0;
        testClueArray[13] = 0;
        testClueArray[14] = 0;
        testClueArray[15] = 0;
        testClueArray[16] = 0;
        testClueArray[17] = 0;


        int[] testMultiPartClueArray = new int[4];
        testMultiPartClueArray[0] = 1;
        testMultiPartClueArray[1] = 1;
        testMultiPartClueArray[2] = 1;
        testMultiPartClueArray[3] = 0;


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
        UnityWebRequest www = UnityWebRequest.Post("http://localhost:8001/phpfiles/nofearget.php", form);
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
                if (i == 3 || i == 5 || i == 8 || i == 10)
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
        Debug.Log("Save Data Called!");
        WWWForm form = new WWWForm();
        form.AddField("email", DBManager.userEmail);
        form.AddField("clue1clicked", DBManager.cluesClicked[0]);
        form.AddField("clue1completed", DBManager.multipartCluesCompleted[0]);
        form.AddField("clue2clicked", DBManager.cluesClicked[1]);
        form.AddField("clue2completed", DBManager.multipartCluesCompleted[1]);
        form.AddField("clue3clicked", DBManager.cluesClicked[2]);
        form.AddField("clue4clicked", DBManager.cluesClicked[3]);
        form.AddField("clue4completed", DBManager.multipartCluesCompleted[2]);
        form.AddField("clue5clicked", DBManager.cluesClicked[4]);
        form.AddField("clue5completed", DBManager.multipartCluesCompleted[3]);
        form.AddField("clue6clicked", DBManager.cluesClicked[5]);
        form.AddField("clue7clicked", DBManager.cluesClicked[6]);
        form.AddField("clue8clicked", DBManager.cluesClicked[7]);
        form.AddField("clue9clicked", DBManager.cluesClicked[8]);
        form.AddField("clue10clicked", DBManager.cluesClicked[9]);
        form.AddField("clue11clicked", DBManager.cluesClicked[10]);
        form.AddField("clue12clicked", DBManager.cluesClicked[11]);
        form.AddField("clue13clicked", DBManager.cluesClicked[12]);
        form.AddField("clue14clicked", DBManager.cluesClicked[13]);
        form.AddField("clue15clicked", DBManager.cluesClicked[14]);
        form.AddField("clue16clicked", DBManager.cluesClicked[15]);
        form.AddField("clue17clicked", DBManager.cluesClicked[16]);
        form.AddField("clue18clicked", DBManager.cluesClicked[17]);
        form.AddField("quizcompleted", DBManager.quizCompleted);
        //form.AddField("quizCompleted", DBManager.quizCompleted);

        UnityWebRequest www = UnityWebRequest.Post("http://localhost:8001/phpfiles/nofearset.php", form);
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
        progressForm.AddField("module_id", 3);
        progressForm.AddField("progress", DBManager.calculateProgress().ToString());
        progressForm.AddField("date_complete", DBManager.timeCompleted);
        progressForm.AddField("stage", 1);

        UnityWebRequest progressWWW = UnityWebRequest.Post("http://localhost:8001/phpfiles/nofearprogress.php", progressForm);
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
