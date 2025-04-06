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
    public ActivateClue activateStarter;
    public GameObject activateEnder;
    private CountingTypes ender;
    private CountingTypes2 ender2;
    private bool allFound;
    // Start is called before the first frame update
    void Start()
    {
        //Destroy(canvas.gameObject);
        //canvas.SetActive(false);
        if ((activateEnder.GetComponent<CountingTypes>()) != null)
        {
            ender = activateEnder.GetComponent<CountingTypes>();
        } else
        {
            ender2 = activateEnder.GetComponent<CountingTypes2>();
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (ender != null)
        {
            allFound = ender.allFound();
        }
        else
        {
            allFound = ender2.allFound();
        }
    }

    void OnMouseDown()
    {
        if (!alreadyClicked && (allFound == true || activateStarter.getAlrClk() == false))
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
