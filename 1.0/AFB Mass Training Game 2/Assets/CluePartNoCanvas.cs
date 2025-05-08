using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class CluePartNoCanvas: MonoBehaviour
{
    private bool alreadyInstantiated = false;
    public GameObject canvas;
    public GameObject mini;
    public GameObject toolbar;
    public GameObject clueCounter;
    public List<GameObject> counters;
    private TMP_Text[] texts;
    public ActivateClue actClue;
    public int clueID;
    private bool alreadyUpdated = false;

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
        if (DBManager.cluesClicked[clueID - 1] == 1 && !alreadyUpdated)
        {
            Instantiate(mini.gameObject, toolbar.transform);
            //Instantiate(clueCounter.gameObject);

            alreadyInstantiated = true;
            alreadyClicked = true;
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
        if (!alreadyClicked && countersEmpty && actClue.getAlrClk())
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
        return alreadyClicked;
    }
}
