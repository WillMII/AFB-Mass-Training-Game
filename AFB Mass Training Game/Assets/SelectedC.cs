using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class SelectedC : MonoBehaviour
{


    public TMP_Text text;
    public bool correct;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OnClick()
    {
        text.text = "C";
        if (text.gameObject.name == "Answer 1")
        {
            correct = false;
            Debug.Log("Incorrect");
        }
    }
}
