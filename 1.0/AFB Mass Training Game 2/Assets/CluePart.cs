using System.Collections;
using System.Collections.Generic;
using UnityEngine;




public class CluePart : MonoBehaviour
{
    //private int foundNum;
    private bool alreadyClicked;
    public ActivateClue starter;
    public GameObject canvas;
    public int starterClueID;

    // Start is called before the first frame update
    void Start()
    {
        if (starterClueID == 1)
        {
            if (DBManager.multipartCluesCompleted[0] == 1)
            {
                alreadyClicked = true;
            }
            else
            {
                alreadyClicked = false;
            }
        }
        else if (starterClueID == 2)
        {
            if (DBManager.multipartCluesCompleted[1] == 1)
            {
                alreadyClicked = true;
            }
            else
            {
                alreadyClicked = false;
            }
        }
        else if (starterClueID == 4)
        {
            if (DBManager.multipartCluesCompleted[2] == 1)
            {
                alreadyClicked = true;
            }
            else
            {
                alreadyClicked = false;
            }
        } else if (starterClueID == 5)
        {
            if (DBManager.multipartCluesCompleted[3] == 1)
            {
                alreadyClicked = true;
            }
            else
            {
                alreadyClicked = false;
            }
        }
        else
        {
            alreadyClicked = false;
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }


    void OnMouseDown()
    {
        if (!alreadyClicked && starter.getAlrClk())
        {
            alreadyClicked = true;
            Instantiate(canvas.gameObject);
            canvas.gameObject.SetActive(true);
        }
    }

    public bool getAlrClk()
    {
        return alreadyClicked;
    }
}
