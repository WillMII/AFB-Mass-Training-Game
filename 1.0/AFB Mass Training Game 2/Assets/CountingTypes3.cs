using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEditor.Experimental.GraphView;

public class CountingTypes3 : MonoBehaviour
{

    public List<CluePart> parts;
    public ActivateClue start;
    private bool[] found;
    public TMP_Text text;
    private int numFound;
    private bool alreadyInstantiated;
    public int clueIDAssociatedWith;
    public GameObject typesFound;
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
                if (clueIDAssociatedWith == 1)
                {
                    DBManager.multipartCluesCompleted[1] = 1;
                } else if (clueIDAssociatedWith == 2) {
                    DBManager.multipartCluesCompleted[2] = 1;
                } else if (clueIDAssociatedWith == 4)
                {
                    DBManager.multipartCluesCompleted[4] = 1;
                }
                
                alreadyInstantiated = true;
            }
            text.text = "";
        }
    }

    public bool allFound()
    {
        return numFound == parts.Count;
    }
}
