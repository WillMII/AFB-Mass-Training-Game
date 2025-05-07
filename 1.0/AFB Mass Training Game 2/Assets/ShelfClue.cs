using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ShelfClue : MonoBehaviour
{
    private bool alreadyInstantiated = false;
    private bool alreadyUpdated;
    public GameObject canvas;
    public GameObject mini;
    public GameObject toolbar;
    private bool alreadyClicked;
    public List<GameObject> counters;
    public int clueID;
    private TMP_Text[] texts;
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
        if (DBManager.cluesClicked[2] == 1 && (alreadyUpdated == false) && clueID == 3)
        {
            Debug.Log("This is being reached!");
            if (toolbar == null)
                return;
            Instantiate(mini.gameObject, toolbar.transform);
            alreadyClicked = true;
            alreadyInstantiated = true;
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
            Instantiate(canvas.gameObject);
            if (!alreadyInstantiated)
            {
                Instantiate(mini.gameObject, toolbar.transform);
                alreadyInstantiated = true;
                DBManager.cluesClicked[clueID - 1] = 1;

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
}
