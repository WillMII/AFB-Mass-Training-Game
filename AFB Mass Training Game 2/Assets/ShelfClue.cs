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
    private bool alreadyClicked;
    public List<GameObject> counters;
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
