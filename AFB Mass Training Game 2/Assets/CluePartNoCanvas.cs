using System.Collections;
using System.Collections.Generic;
using UnityEngine;




public class CluePartNoCanvas : MonoBehaviour
{
    //private int foundNum;
    private bool alreadyClicked;
    public ActivateClue starter;
    

    // Start is called before the first frame update
    void Start()
    {
        alreadyClicked = false;
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
            
        }
    }

    public bool getAlrClk()
    {
        return alreadyClicked;
    }
}
