using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ActivateClue : MonoBehaviour
{
    private bool alreadyInstantiated = false;
    public GameObject canvas;
    public GameObject mini;
    public GameObject toolbar;
    public GameObject clueCounter;


    private bool alreadyClicked;
    // Start is called before the first frame update
    void Start()
    {
        //Destroy(canvas.gameObject);
        //canvas.SetActive(false);
    }

    // Update is called once per frame
    void Update()
    {

    }

    void OnMouseDown()
    {
        if (!alreadyClicked)
        {
            Debug.Log("Down");
            Debug.Log(getAlrClk());
            Instantiate(canvas.gameObject);
            if (!alreadyInstantiated)
            {
                Instantiate(mini.gameObject, toolbar.transform);
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
