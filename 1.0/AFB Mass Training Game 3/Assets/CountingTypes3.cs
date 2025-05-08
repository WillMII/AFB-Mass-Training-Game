using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class CountingTypes3 : MonoBehaviour
{

    public List<CluePart> parts;
    public ActivateClue start;
    private bool[] found;
    private bool alreadyUpdated = false;
    public TMP_Text text;
    private int numFound;
    private bool alreadyInstantiated;
    public GameObject typesFound;
    public int clueIDAssociatedWith;
    // Start is called before the first frame update
    void Start()
    {
        found = new bool[parts.Count];
        for (int i = 0;i < parts.Count; i++)
        {
            found[i] = parts[i].getAlrClk();
        }
        numFound = 0;
        alreadyInstantiated = false;
    }

    // Update is called once per frame
    void Update()
    {
        if (!alreadyUpdated) {

            if (DBManager.multipartCluesCompleted[0] == 1 && clueIDAssociatedWith == 2)
            {
                alreadyInstantiated = true;
                numFound = parts.Count;
                alreadyUpdated = true;

            } else if (DBManager.multipartCluesCompleted[1] == 1 && clueIDAssociatedWith == 4)
            {
                alreadyInstantiated = true;
                numFound = parts.Count;
                alreadyUpdated = true;
            } else if (DBManager.multipartCluesCompleted[2] == 1 && clueIDAssociatedWith == 8)
            {
                alreadyInstantiated = true;
                numFound = parts.Count;
                alreadyUpdated = true;
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

        } else
        {
            if (!alreadyInstantiated)
            {
                Instantiate(typesFound.gameObject);
                if (clueIDAssociatedWith == 2)
                {
                    DBManager.multipartCluesCompleted[0] = 1;
                    alreadyInstantiated = true;
                } else if (clueIDAssociatedWith == 4)
                {
                    DBManager.multipartCluesCompleted[1] = 1;
                    alreadyInstantiated = true;
                } else if (clueIDAssociatedWith == 8)
                {
                    DBManager.multipartCluesCompleted[2] = 1;
                    alreadyInstantiated = true;
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
