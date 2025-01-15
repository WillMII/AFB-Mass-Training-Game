using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class ShelfClue : MonoBehaviour
{
    private bool alreadyInstantiated = false;
    public GameObject canvas;
    public GameObject lilShelf;
    public GameObject toolbar;
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
        Debug.Log("Down");
        Instantiate(canvas.gameObject);
        if (!alreadyInstantiated)
        {
            Instantiate(lilShelf.gameObject, toolbar.transform);
            alreadyInstantiated = true;
        }
        
        canvas.gameObject.SetActive(true);
        Debug.Log(alreadyInstantiated);
    }
}
