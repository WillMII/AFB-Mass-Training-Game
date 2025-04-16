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
