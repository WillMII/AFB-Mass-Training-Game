using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
//using ShelfClue;

public class Clue2 : MonoBehaviour
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
        //bool alrInst = shelfClue.getAlrInst();
        //ShelfClue shelfClue = FindObjectOfType<ShelfClue>();
    }

    // Update is called once per frame
    void Update()
    {

    }

    void OnMouseDown()
    {
        ShelfClue shelfClue = FindObjectOfType<ShelfClue>();
        bool alrInst = shelfClue.getAlrInst();

        if (!alreadyClicked && alrInst == true)
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
}
