using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ActivateClue : MonoBehaviour
{
    private bool alreadyInstantiated = false;
    private bool alreadyUpdated = false;
    public GameObject canvas;
    public GameObject mini;
    public GameObject toolbar;
    public GameObject clueCounter;
    public List<GameObject> counters;
    private TMP_Text[] texts;
    public int clueID;


    private bool alreadyClicked;
    // Start is called before the first frame update
    void Start()
    {
        texts = new TMP_Text[counters.Count];
        for (int i = 0; i < counters.Count; i++)
        {
            texts[i] = counters[i].GetComponentInChildren<TMP_Text>();
        }
        //Destroy(canvas.gameObject);
        //canvas.SetActive(false);
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
        bool countersEmpty = true;
        for (int i = 0; i < counters.Count; i++)
        {
            if (texts[i].text != "" && !(counters[i].GetComponentInChildren<CountingTypes3>().allFound()))
            {
                countersEmpty = false;
                break;
            }
        }
        if (!alreadyClicked && countersEmpty)
        {
            Debug.Log("Down");
            Debug.Log(getAlrClk());
            Instantiate(canvas.gameObject);
            if (!alreadyInstantiated)
            {
                Instantiate(mini.gameObject, toolbar.transform);
                DBManager.cluesClicked[clueID - 1] = 1;
                //Instantiate(clueCounter.gameObject);

                alreadyInstantiated = true;

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

    public bool getAlrClk()
    {
        if (clueID == 2)
        {
            if (DBManager.multipartCluesCompleted[0] == 1)
            {
                return true;
            }
        } else if (clueID == 4)
        {
            if (DBManager.multipartCluesCompleted[1] == 1)
            {
                return true;
            }
        } else if (clueID == 8)
        {
            if (DBManager.multipartCluesCompleted[2] == 1)
            {
                return true;
            }
        }
        return alreadyClicked;
    }
}
