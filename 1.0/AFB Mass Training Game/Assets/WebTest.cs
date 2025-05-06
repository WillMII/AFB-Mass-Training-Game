using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class WebTest : MonoBehaviour
{
    IEnumerator Start()
    {
        UnityWebRequest request = UnityWebRequest.Get("http://localhost:8000/api/user");
        request.SetRequestHeader("Content-Type", "application/json");
        yield return request.SendWebRequest();

        if (request.result == UnityWebRequest.Result.Success)
        {
            Debug.Log(request.downloadHandler.text);
        }
        else
        {
            Debug.LogError("Request failed: " + request.error);
        }

        string[] webResults = request.downloadHandler.text.Split('\n');
        foreach (string s in webResults)
        {
            Debug.Log(s);
        }


    }
}
