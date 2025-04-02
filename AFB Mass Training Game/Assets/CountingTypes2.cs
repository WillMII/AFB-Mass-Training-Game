using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;



public class CountingTypes2 : MonoBehaviour
{
    public CluePart DVD;
    public CluePart pres;
    public CluePart doc;
    public CluePart ED;
    public ActivateClue keyboard;

    public GameObject typesFound;

    private bool[] found = new bool[7];
    public TMP_Text text;
    private int numFound;
    private int i;

    private bool alreadyInstantiated;

    // Start is called before the first frame update
    void Start()
    {
        found[0] = DVD.getAlrClk();
        found[1] = pres.getAlrClk();
        found[2] = doc.getAlrClk();
        found[3] = ED.getAlrClk();

        //text = this.gameObject.GetComponent<TMP_Text>();
        numFound = 0;
        alreadyInstantiated = false;
    }

    // Update is called once per frame
    void Update()
    {
        if (numFound < 4)
        {
            if (keyboard.getAlrClk())
            {
                found[0] = DVD.getAlrClk();
                found[1] = pres.getAlrClk();
                found[2] = doc.getAlrClk();
                found[3] = ED.getAlrClk();
                
                numFound = 0;
                i = 0;

                while (i < 4)
                {
                    if (found[i])
                    {
                        numFound += 1;
                    }
                    i++;
                }
                Debug.Log(numFound);
                /*
                if (found[0])
                {
                    numFound = 1;
                }
                */

                text.text = "STINFO Types Found: " + numFound + "/4";
            }
            else
            {
                text.text = "";
            }
        }
        else
        {
            if (!alreadyInstantiated)
            {
                Instantiate(typesFound.gameObject);
                alreadyInstantiated = true;
            }
            text.text = "";
        }

    }

    public int getNumFound()
    {
        return numFound;
    }

    public bool allFound()
    {
        return numFound == 4;
    }
}