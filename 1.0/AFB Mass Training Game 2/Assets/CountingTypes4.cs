using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class CountingTypes4 : MonoBehaviour
{

    public List<CluePartNoCanvas> parts;
    public ActivateClue start;
    private bool[] found;
    public TMP_Text text;
    private int numFound;
    private bool alreadyInstantiated;
    public GameObject typesFound;
    public int clueIDAssociatedWith;
    // Start is called before the first frame update
    void Start()
    {
        found = new bool[parts.Count];
        for (int i = 0; i < parts.Count; i++)
        {
            found[i] = parts[i].getAlrClk();
        }
        numFound = 0;
        alreadyInstantiated = false;
    }

    // Update is called once per frame
    void Update()
    {

        if (clueIDAssociatedWith == 5)
        {
            if (DBManager.multipartCluesCompleted[3] == 1)
            {
                numFound = parts.Count;
                alreadyInstantiated = true;
            }
        }
        if (numFound < parts.Count)
        {
            if (start.getAlrClk())
            {
                for (int i = 0; i < parts.Count; i++)
                {
                    found[i] = parts[i].getAlrClk();
                }
                numFound = 0;


                for (int i = 0; i < parts.Count; i++)
                {
                    if (found[i])
                    {
                        numFound++;
                    }
                }
                text.text = "Found: " + numFound + "/" + parts.Count.ToString();
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
                if (clueIDAssociatedWith == 5)
                {
                    Instantiate(typesFound.gameObject);
                    alreadyInstantiated = true;
                    DBManager.multipartCluesCompleted[3] = 1;
                }
                
            }
            text.text = "";
        }
    }

    public bool allFound()
    {
        return numFound == parts.Count;
    }
}
