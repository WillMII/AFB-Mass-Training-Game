using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ShelfClue : MonoBehaviour
{
    private bool alreadyInstantiated = false;
    public GameObject canvas;
    public GameObject mini;
    public GameObject toolbar;
    public GameObject counter;
    public int clueID;
    public bool alreadyUpdated = false;
    //private CountingTypes countingTypes;
    private TMP_Text text;
    private bool alreadyClicked;
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("In Start");
        //Destroy(canvas.gameObject);
        //canvas.SetActive(false);
        text = counter.GetComponentInChildren<TMP_Text>();
        //countingTypes = counter.GetComponent<CountingTypes>();
        
    }

    // Update is called once per frame
    void Update()
    {
        if (DBManager.cluesClicked[clueID - 1] == 1 && (alreadyUpdated == false))
        {
            Debug.Log("This is being reached!");
            alreadyClicked = true;
            alreadyInstantiated = true;
            Instantiate(mini.gameObject, toolbar.transform);
            alreadyUpdated = true;
        }
    }

    void OnMouseDown()
    {
        
        if (!alreadyClicked && text.text == "")
        {
            Debug.Log("Down");
            Instantiate(canvas.gameObject);
            if (!alreadyInstantiated)
            {
                Instantiate(mini.gameObject, toolbar.transform);
                alreadyInstantiated = true;
                DBManager.cluesClicked[clueID - 1] = 1;
                Debug.Log("Clue #" + this.clueID + " added!");

            }

            canvas.gameObject.SetActive(true);
            Debug.Log(alreadyInstantiated);
            alreadyClicked = true;
        }
    }

    public bool getAlrInst()
    {
        return alreadyInstantiated;
    }
    /*
    public void CallSaveData()
    {
        StartCoroutine(SavePlayerData());
    }

    IEnumerator SavePlayerData()
    {
        WWWForm form = new WWWForm();
        form.AddField("email", "TestEmail@email.com");
        form.AddField("clue1clicked", "1");
    }
    */
}

