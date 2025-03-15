using System.Collections;
using System.Collections.Generic;
using UnityEngine;




public class CluePart : MonoBehaviour
{
    //private int foundNum;
    private bool alreadyClicked;
    public ActivateClue starter;
    public GameObject canvas;

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
            Instantiate(canvas.gameObject);
            canvas.gameObject.SetActive(true);
        }
    }

    public bool getAlrClk()
    {
        return alreadyClicked;
    }
}
